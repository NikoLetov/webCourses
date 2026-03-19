import { DATA_USERS, type IUser } from './data'

type IAuthUser = Pick<IUser, 'email' | 'password'>

const STORAGE_KEYS = {
	SESSION: 'session'
} as const

class AuthServices {
	private async setSessionCookie(data: IAuthUser): Promise<boolean> {
		try {
			await cookieStore.set(STORAGE_KEYS.SESSION, JSON.stringify(data))
			return true
		} catch (e) {
			console.error(e)
			return false
		}
	}

	public async getSession(): Promise<boolean> {
		try {
			await cookieStore.get(STORAGE_KEYS.SESSION)
			return true
		} catch (e) {
			console.error(e)
			return false
		}
	}

	public async SignUp({ email, password }: IAuthUser): Promise<boolean> {
		try {
			const result = await new Promise<boolean>((res) => {
				if (DATA_USERS.find((item) => item.email === email)) {
					throw new Error(
						JSON.stringify({
							status: 402,
							message: 'This user already exists, try another one'
						})
					)
				}

				const newUser: IUser = {
					id: Date.now(),
					email,
					password,
					name: 'Default1'
				}

				setTimeout(() => {
					if (DATA_USERS.length === DATA_USERS.push(newUser)) {
						res(false)
						return
					}
					DATA_USERS.push(newUser)
					res(true)
				}, 2000)
			})

			if (!result) {
				throw new Error()
			}

			await this.setSessionCookie({ email, password })
			return true
		} catch (e) {
			console.error(e)
			return false
		}
	}

	public async SignIn({ email, password }: IAuthUser): Promise<boolean> {
		try {
			const result = await new Promise<boolean>((res) => {
				const user = DATA_USERS.find((item) => item.email === email)

				if (!user || user.password !== password) {
					throw new Error(
						JSON.stringify({
							status: 401,
							message: 'Incorrect login or password'
						})
					)
				}

				res(true)
			})

			if (!result) {
				throw new Error()
			}

			await this.setSessionCookie({ email, password })

			return true
		} catch (e) {
			console.error(e)
			return false
		}
	}

	public async SignOut(): Promise<boolean> {
		try {
			await cookieStore.delete(STORAGE_KEYS.SESSION)
			return true
		} catch (e) {
			console.error(e)
			return false
		}
	}
}
export const AuthService = new AuthServices()
