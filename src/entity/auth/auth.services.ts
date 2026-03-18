import { DATA_USERS, type IUser } from './data'

type IAuthUser = Omit<IUser, 'id' | 'name'>

class AuthServices {
	public async getSession(): Promise<boolean> {
		const result = await cookieStore.get('session')
		return !!result
	}

	public async SignUp({ email, password }: IAuthUser): Promise<boolean> {
		try {
			if (DATA_USERS.find((item) => item.email === email)) {
				throw new Error(
					JSON.stringify({
						status: 402,
						message: 'This user already exists, try another one'
					})
				)
			}

			const result = await new Promise<boolean>((res) => {
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
			}).then((status) => {
				if (status)
					cookieStore.set('session', JSON.stringify({ email, password }))
				return status
			})
			return result
		} catch (e) {
			console.error(e)
			return false
		}
	}

	public async SignIn({ email, password }: IAuthUser): Promise<boolean> {
		try {
			const result = await new Promise<boolean>((res) => {
				const user = DATA_USERS.find(
					(item) => item.email === email
				) as IAuthUser

				if (!user) {
					throw new Error(
						JSON.stringify({
							status: 401,
							message: 'Incorrect login or password'
						})
					)
				}
				if (user.password !== password) {
					throw new Error(
						JSON.stringify({
							status: 401,
							message: 'Incorrect login or password'
						})
					)
				}
				cookieStore.set('session', JSON.stringify(user))
				res(true)
			})
			return result
		} catch (e) {
			console.error(e)
			return false
		}
	}
}
export const AuthService = new AuthServices()
