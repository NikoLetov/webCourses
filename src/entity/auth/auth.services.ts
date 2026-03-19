import { DATA_USERS, type IUser } from './data'

type IAuthUser = Pick<IUser, 'email' | 'password'>

const STORAGE_KEYS = {
	SESSION: 'session'
} as const
class AuthServices {
	//INFO:Вынес получения куки
	private async getSessionCookie(): Promise<boolean> {
		try {
			const cookie = await cookieStore.get(STORAGE_KEYS.SESSION)
			if (!cookie) {
				throw new Error()
			}
			return !!cookie
		} catch (e) {
			console.error(e)
			return false
		}
	}

	//INFO: Вынес установку куки
	private async setSessionCookie(data: IAuthUser): Promise<boolean> {
		try {
			await cookieStore.set(STORAGE_KEYS.SESSION, JSON.stringify(data))
			const isCheck = await this.getSessionCookie()

			if (!isCheck) {
				throw new Error()
			}

			return isCheck
		} catch (e) {
			console.error(e)
			return false
		}
	}

	public async getSession(): Promise<boolean> {
		try {
			return await this.getSessionCookie()
		} catch (e) {
			console.error(e)
			return false
		}
	}

	public async SignUp({ email, password }: IAuthUser): Promise<boolean> {
		try {
			await new Promise<boolean>((res) => {
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
					if (Math.random() < 0.1) {
						throw new Error()
					} else {
						DATA_USERS.push(newUser)
						res(true)
					}
				}, 2000)
			})

			return await this.setSessionCookie({ email, password })
		} catch (e) {
			console.error(e)
			return false
		}
	}

	public async SignIn({ email, password }: IAuthUser): Promise<boolean> {
		try {
			await new Promise<boolean>((res) => {
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

			return await this.setSessionCookie({ email, password })
		} catch (e) {
			console.error(e)
			return false
		}
	}

	public async SignOut(): Promise<boolean> {
		try {
			await cookieStore.delete(STORAGE_KEYS.SESSION)
			return this.getSessionCookie()
		} catch (e) {
			console.error(e)
			return false
		}
	}
}
export const AuthService = new AuthServices()
