export interface UserComment {
	username: string
	rating: number
	comment: string
}

export interface CoursesItem {
	id: number
	name: string
	rating: number
	description: string
	img?: string | undefined
	reviews: UserComment[]
}
