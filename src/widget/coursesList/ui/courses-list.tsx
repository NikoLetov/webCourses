import {
	CardPreview,
	type ICoursesItem
} from '@/entities/card-item/ui/card-preview'
import { use } from 'react'
import styles from './courses-list.module.scss'

export const CoursesList = ({ data }: { data: Promise<ICoursesItem[]> }) => {
	const courses = use(data)

	if (!courses.length) {
		return <div>Список на данный момент пуст</div>
	}

	return (
		<ul className={styles.list}>
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
