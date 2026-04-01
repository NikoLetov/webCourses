import { Card } from '@/entity/card-item'
import { useState } from 'react'
import { COURSES_ITEMS } from '../data'
import styles from './courses-list.module.scss'

export const CoursesList = () => {
	const [courses] = useState(() => COURSES_ITEMS)

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
