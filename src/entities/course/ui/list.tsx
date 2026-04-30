import { CardPreview } from '@/entities/course/ui/card-preview'
import { use, type Ref } from 'react'
import type { FetchPagination } from '../api/types'

export const CoursesList = ({
	data,
	ref,
	isLoading
}: {
	data: Promise<FetchPagination>
	ref: Ref<HTMLDivElement>
	isLoading: boolean
}) => {
	const courses = use(data)

	if (!courses.data.length) {
		return <div>Список на данный момент пуст</div>
	}
	return (
		<>
			<ul className="flex justify-between gap-2.5 flex-wrap relative">
				{courses.data &&
					courses.data.map((item) => (
						<CardPreview
							key={item.id}
							item={item}
						/>
					))}
			</ul>
			{!!courses.next && <div ref={ref} />}
			{isLoading && <div>Loading...</div>}
		</>
	)
}
