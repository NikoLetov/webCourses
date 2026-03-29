export type AuthUserType = Pick<UserType, 'email' | 'password'>
export type AuthSession = Omit<UserType, 'password'>
export type UserRole = 'admin' | 'user'
export type UserType = {
	id: number
	name: string
	email: string
	password: string
	role: UserRole
	avatar?: string
}
