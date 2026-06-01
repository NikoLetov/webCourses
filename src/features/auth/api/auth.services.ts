import type {
	AuthSession,
	AuthUserType,
	UserType
} from '@/entities/auth/api/type'
import {
	RegistrationError,
	UnauthorizedError,
	type ApiResponse
} from '@/shared/api/types'

const STORAGE_KEYS = {
	SESSION: 'session'
} as const

export const AuthService = {
	async getSessionCookie(): Promise<CookieListItem | null> {
		try {
			const cookie = await cookieStore.get(STORAGE_KEYS.SESSION)
			if (!cookie) {
				return null
			}

			return cookie
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e))
			throw error
		}
	},

	async setSessionCookie(data: AuthSession): Promise<CookieListItem> {
		try {
			await cookieStore.set(STORAGE_KEYS.SESSION, JSON.stringify(data))

			const isCheck = await this.getSessionCookie()

			if (!isCheck) {
				throw new Error()
			}

			return isCheck
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e))
			throw error
		}
	},
	async getSession(): Promise<AuthSession | null> {
		try {
			const session = await this.getSessionCookie()
			if (!session) {
				return null
			}
			const user: UserType =
				typeof session.value !== 'undefined' && JSON.parse(session.value)
			return user
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e))
			throw new UnauthorizedError(error.message)
		}
	},

	async SignUp(data: AuthUserType): Promise<ApiResponse<AuthSession>> {
		const result = await fetch('http://localhost:3000/user', {
			method: 'POST',
			body: JSON.stringify(data)
		})
		if (!result.ok) {
			throw new RegistrationError()
		}

		const response: UserType = await result.json()
		const { password, ...user } = response
		await this.setSessionCookie(user)
		return {
			success: true,
			status: 201,
			data: user
		}
	},

	async SignIn(data: AuthUserType): Promise<ApiResponse<AuthSession>> {
		const result = await fetch(
			`http://localhost:3000/user?email=${data.email}`,
			{
				method: 'GET'
			}
		)
		if (!result.ok) {
			throw new UnauthorizedError()
		}
		const response: UserType[] = await result.json()

		const findUser: UserType | undefined = response.find(
			(item: UserType) => item.password === data.password
		)
		if (!findUser) {
			throw new UnauthorizedError()
		}
		const { password, ...user } = findUser
		await this.setSessionCookie(user)

		return {
			success: true,
			status: 200,
			data: user
		}
	},

	async SignOut(): Promise<void> {
		try {
			await cookieStore.delete(STORAGE_KEYS.SESSION)
			await this.getSessionCookie()
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e))
			throw error
		}
	}
}

// // ---------- IndexedDB (для картинки) ----------
// const DB_NAME = 'AppDB'
// const STORE_NAME = 'avatars'

// function openDB() {
// 	return new Promise((resolve, reject) => {
// 		const request = indexedDB.open(DB_NAME, 1)
// 		console.log(request)
// 		request.onupgradeneeded = () => {
// 			const db = request.result
// 			if (!db.objectStoreNames.contains(STORE_NAME)) {
// 				db.createObjectStore(STORE_NAME, { keyPath: 'userId' })
// 			}
// 		}
// 		request.onsuccess = () => resolve(request.result)
// 		request.onerror = () => reject(request.error)
// 	})
// }

// async function saveAvatarToIndexedDB(userId, file) {
// 	const db = await openDB()
// 	const tx = db.transaction(STORE_NAME, 'readwrite')
// 	tx.objectStore(STORE_NAME).put({ userId, blob: file })
// }

// async function loadAvatarFromIndexedDB(userId) {
// 	const db = await openDB()
// 	const tx = db.transaction(STORE_NAME, 'readonly')
// 	return new Promise((resolve) => {
// 		const request = tx.objectStore(STORE_NAME).get(userId)
// 		request.onsuccess = () => resolve(request.result?.blob || null)
// 	})
// }

// // ---------- SessionStorage (для текстовых данных) ----------
// function saveUserToSession(user) {
// 	const sessionData = {
// 		id: user.id,
// 		name: user.name,
// 		email: user.email,
// 		theme: user.theme || 'light',
// 		lastLogin: Date.now()
// 		// avatar НЕ кладем сюда — только ссылка!
// 	}
// 	sessionStorage.setItem('user', JSON.stringify(sessionData))
// }

// function getUserFromSession() {
// 	const data = sessionStorage.getItem('user')
// 	return data ? JSON.parse(data) : null
// }

// // ---------- ПОЛЬЗОВАТЕЛЬСКИЙ СКРИПТ ----------
// // При логине
// async function onLogin(user) {
// 	// Сохраняем текстовые данные
// 	saveUserToSession(user)

// 	// Сохраняем аватар (если есть)
// 	if (user.avatarFile) {
// 		await saveAvatarToIndexedDB(user.id, user.avatarFile)
// 	}
// }

// // При загрузке страницы
// async function restoreUserSession() {
// 	const user = getUserFromSession()
// 	if (!user) return null

// 	// Подгружаем аватар из IndexedDB
// 	const avatarBlob = await loadAvatarFromIndexedDB(user.id)

// 	return {
// 		...user,
// 		avatarUrl: avatarBlob ? URL.createObjectURL(avatarBlob) : null
// 	}
// }
