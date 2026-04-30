import type { CoursesItem } from '../ui/type'

export type FetchPagination = {
	data: CoursesItem[]
	page: number
	limit: number
	next: number
	prev: number
	last: number
	first: number
}

export type InfinityFetch = {
	per_page: string
	title: string
	sort: '-rating' | 'rating'
}
