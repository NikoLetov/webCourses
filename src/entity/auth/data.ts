export interface IUser {
	id: number
	name: string
	email: string
	password: string
}

export const DATA_USERS: IUser[] = [
	{
		id: 1,
		name: 'Niko',
		email: 'Express@mail.ru',
		password: '123'
	},
	{
		id: 2,
		name: 'Dima',
		email: 'Dima@mail.ru',
		password: '441'
	}
]
