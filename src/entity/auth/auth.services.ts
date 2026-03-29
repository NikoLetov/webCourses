import type { AuthUserType, UserType } from './type.api'

const STORAGE_KEYS = {
	SESSION: 'session'
} as const

// class AuthServices {
// 	//INFO:Просто весит для иллюзии сервиса со своим Url
// 	protected url
// 	constructor(url: string) {
// 		this.url = url
// 	}

// 	//INFO:Вынес получения куки

// 	private async getSessionCookie(): Promise<CookieListItem | undefined> {
// 		try {
// 			const cookie = await cookieStore.get(STORAGE_KEYS.SESSION)
// 			if (!cookie) {
// 				return undefined
// 			}

// 			return cookie
// 		} catch (e) {
// 			const error = e instanceof Error ? e : new Error(String(e))
// 			throw error
// 		}
// 	}

// 	//INFO: Вынес установку куки

// 	private async setSessionCookie(data: AuthSession): Promise<CookieListItem> {
// 		try {
// 			await cookieStore.set(STORAGE_KEYS.SESSION, JSON.stringify(data))
// 			const isCheck = await this.getSessionCookie()

// 			if (!isCheck) {
// 				throw new Error()
// 			}

// 			return isCheck
// 		} catch (e) {
// 			const error = e instanceof Error ? e : new Error(String(e))
// 			throw error
// 		}
// 	}

// 	public async getSession() {
// 		try {
// 			return await this.getSessionCookie()
// 		} catch (e) {
// 			const error = e instanceof Error ? e : new Error(String(e))
// 			throw new UnauthorizedError(error.message)
// 		}
// 	}

// 	public async SignUp({
// 		email,
// 		password
// 	}: AuthUserType): Promise<ApiResponse<Omit<UserType, 'password'>>> {
// 		try {
// 			const response = await new Promise<
// 				ApiResponse<Omit<UserType, 'password'>>
// 			>((res, rej) => {
// 				if (DATA_USERS.find((item) => item.email === email)) {
// 					rej(new RegistrationError())
// 				}

// 				const newUser: UserType = {
// 					id: Date.now(),
// 					email,
// 					password,
// 					name: 'Default1',
// 					role: 'user',
// 					avatar: ''
// 				}

// 				setTimeout(() => {
// 					if (Math.random() < 0.1) {
// 						rej(new RegistrationError())
// 						return
// 					} else {
// 						DATA_USERS.push(newUser)
// 						const { password, ...data } = newUser
// 						void password
// 						res({
// 							success: true,
// 							data,
// 							status: 201
// 						})
// 					}
// 				}, 2000)
// 			})

// 			if (response.success) {
// 				await this.setSessionCookie(response.data)
// 			}

// 			return response
// 		} catch (e) {
// 			const error = e instanceof Error ? e : new Error(String(e))
// 			throw new RegistrationError(error.message)
// 		}
// 	}

// 	public async SignIn({
// 		email,
// 		password: password1
// 	}: AuthUserType): Promise<ApiResponse<Omit<UserType, 'password'>>> {
// 		try {
// 			const response = await new Promise<
// 				ApiResponse<Omit<UserType, 'password'>>
// 			>((res, rej) => {
// 				const user = DATA_USERS.find((item) => item.email === email)

// 				if (!user || user.password !== password1) {
// 					rej(new UnauthorizedError())
// 					return
// 				}

// 				const { password, ...data } = user
// 				void password

// 				res({
// 					success: true,
// 					data,
// 					status: 200
// 				})
// 			})
// 			if (response.success) {
// 				await this.setSessionCookie(response.data)
// 			}
// 			return response
// 		} catch (e) {
// 			const error = e instanceof Error ? e : new Error(String(e))
// 			throw new UnauthorizedError(error.message)
// 		}
// 	}

// 	public async SignOut(): Promise<void> {
// 		try {
// 			await cookieStore.delete(STORAGE_KEYS.SESSION)
// 			await this.getSessionCookie()
// 		} catch (e) {
// 			const error = e instanceof Error ? e : new Error(String(e))
// 			throw error
// 		}
// 	}
// }
// export const AuthService = new AuthServices('https://auth:v1')

export const AuthService = {
	getSession() {},
	setSession() {},

	async SignUp(data: AuthUserType): Promise<UserType | null> {
		const result = await fetch('http://localhost:3000/user', {
			method: 'POST',
			body: JSON.stringify(data)
		})
		if (!result.ok) {
			throw new Error()
		}
		const response = result.json()
		return response
	},

	SignIn() {},

	SignOut() {}
}
