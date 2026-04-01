import {
	RegistrationError,
	UnauthorizedError,
	type ApiResponse
} from '@/shared/api/types'
import type { AuthSession, AuthUserType, UserType } from './type.api'

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
