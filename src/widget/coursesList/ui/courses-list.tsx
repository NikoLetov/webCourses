import { Card } from '@/entity/card-item'
import { use } from 'react'
import type { ICoursesItem } from '../data'
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
					<Card
						key={item.id}
						item={item}
					/>
				))}
		</ul>
	)
}
