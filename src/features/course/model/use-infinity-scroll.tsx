import type {
	FetchPagination,
	InfinityFetch
} from '@/entities/course/api/types'
import { startTransition, useCallback, useState } from 'react'
import { fetchCourses } from '../api/courses.services'

export const useInfinityScroll = (
	values: InfinityFetch,
	initialPage: number
) => {
	const [promise, setPromise] = useState<Promise<FetchPagination>>(() =>
		Promise.resolve({
			data: [],
			page: 1,
			limit: 1,
			next: 1,
			prev: 1,
			last: 1,
			first: 1
		})
	)

	const [page, setPage] = useState(initialPage)
	const [isLoading, setIsLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)

	const fetchNextPage = useCallback(
		async (page: number) => {
			if (isLoading || !hasMore) return
			const controller = new AbortController()
			setIsLoading(true)
			try {
				const newData = await fetchCourses(values, page, controller.signal)

				startTransition(() => {
					setPromise(async (prevPromise) => {
						const prevData = await prevPromise

						return {
							...newData,
							data: [...prevData.data, ...newData.data]
						}
					})
				})
				if (newData && page >= newData.last) {
					setHasMore(false)
				}
			} finally {
				setIsLoading(false)
			}
			return () => controller.abort()
		},
		[isLoading, hasMore, values]
	)
	const observerRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (!node || isLoading || !hasMore) return

			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && !isLoading) {
						const nextPage = page + 1
						setPage(nextPage)
						fetchNextPage(nextPage)
					}
				},
				{ threshold: 0.1 }
			)

			observer.observe(node)

			return () => observer.disconnect()
		},
		[page, fetchNextPage, isLoading, hasMore]
	)
	const handleFilterChange = useCallback(
		(params: InfinityFetch, signal?: AbortSignal) => {
			setPage(1)
			setHasMore(true)
			setPromise(fetchCourses(params, 1, signal))
		},
		[setPromise, setHasMore, setPage]
	)

	return {
		promise,
		isLoading,
		observerRef,
		handleFilterChange
	}
}
