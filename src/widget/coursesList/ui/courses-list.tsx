import {
	CardPreview,
	type ICoursesItem
} from '@/entities/card-item/ui/card-preview'
import { use } from 'react'

export const CoursesList = ({ data }: { data: Promise<ICoursesItem[]> }) => {
	const courses = use(data)

	if (!courses.length) {
		return <div>Список на данный момент пуст</div>
	}

	return (
		<ul className="flex justify-between gap-2.5 flex-wrap">
			{courses &&
				courses.map((item) => (
					<CardPreview
						key={item.id}
						item={item}
					/>
				))}
		</ul>
	)
}
