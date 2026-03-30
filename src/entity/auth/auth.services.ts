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
	async getSessionCookie(): Promise<CookieListItem | undefined> {
		try {
			const cookie = await cookieStore.get(STORAGE_KEYS.SESSION)
			console.log(cookie)
			if (!cookie) {
				return undefined
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
	async getSession(): Promise<CookieListItem | undefined> {
		try {
			return await this.getSessionCookie()
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e))
			throw new UnauthorizedError(error.message)
		}
	},

	async SignUp(data: AuthUserType): Promise<ApiResponse<UserType>> {
		const result = await fetch('http://localhost:3000/user', {
			method: 'POST',
			body: JSON.stringify(data)
		})
		if (!result.ok) {
			throw new RegistrationError()
		}
		const response = await result.json()
		await this.setSessionCookie(response)
		return {
			success: true,
			status: 201,
			data: response
		}
	},

	async SignIn(data: AuthUserType): Promise<ApiResponse<UserType>> {
		const result = await fetch(
			`http://localhost:3000/user?email=${data.email}`,
			{
				method: 'GET'
			}
		)
		if (!result.ok) {
			throw new UnauthorizedError()
		}
		const response = await result.json()

		const findUser = response.find(
			(item: UserType) => item.password === data.password
		)
		if (!findUser) {
			throw new UnauthorizedError()
		}
		await this.setSessionCookie(findUser)

		return {
			success: true,
			status: 200,
			data: findUser
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
