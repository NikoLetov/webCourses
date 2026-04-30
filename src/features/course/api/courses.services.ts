import type {
	FetchPagination,
	InfinityFetch
} from '@/entities/course/api/types'

export const CoursesService = {
	get() {}
}
export async function fetchCourses(
	params: InfinityFetch,
	page: number,
	signal?: AbortSignal
): Promise<FetchPagination> {
	try {
		const query = new URLSearchParams({
			'name:contains': params.title,
			_page: String(page),
			_per_page: params.per_page,
			_sort: params.sort
		}).toString()
		const url = 'http://localhost:3000/courses?' + query
		const response = await fetch(url, {
			method: 'GET',
			signal: signal
		})
		if (!response.ok) {
			throw new Error()
		}

		const data: FetchPagination = await response.json()
		return data
	} catch (e) {
		if (e instanceof Error && e.name === 'AbortError')
			return new Promise(() => {})

		throw new Error()
	}
}
