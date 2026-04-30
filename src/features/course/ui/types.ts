export type FilterCourses = {
	title?: string
	sort?: 'rating' | '-rating'
	signal?: AbortSignal
	page?: number
	limit?: number
}
