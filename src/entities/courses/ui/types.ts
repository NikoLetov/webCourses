export interface UserComment {
	username: string
	rating: number
	comment: string
}

export interface ICoursesItem {
	id: number
	name: string
	rating: number
	description: string
	img?: string | undefined
	reviews: UserComment[]
}

export type FilterCourses = {
	title: string
	sort: 'rating' | '-rating'
	signal?: AbortSignal
}
