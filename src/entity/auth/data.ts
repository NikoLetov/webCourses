export type UserRole = 'admin' | 'user'
export type UserType = {
	id: number
	name: string
	email: string
	password: string
	role: UserRole
	avatar?: string
}

export const DATA_USERS: UserType[] = [
	{
		id: 1,
		name: 'Niko',
		email: 'Express@mail.ru',
		password: '123',
		role: 'admin'
	},
	{
		id: 2,
		name: 'Dima',
		email: 'Dima@mail.ru',
		password: '441',
		role: 'user'
	}
]
