import type { InfinityFetch } from '@/entities/course/api/types'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useEffect, useTransition } from 'react'

export const useFilterForm = (
	onChange: (params: InfinityFetch, signal: AbortSignal) => void,
	values: InfinityFetch
) => {
	const [isPending, startTransition] = useTransition()

	const debounce = useDebounce(values as InfinityFetch, 500)

	useEffect(() => {
		const controller = new AbortController()

		startTransition(() => {
			onChange(
				{
					title: debounce.title,
					sort: debounce.sort,
					per_page: debounce.per_page
				},
				controller.signal
			)
		})

		return () => {
			controller.abort()
		}
	}, [debounce, onChange])

	return { isPending }
}
