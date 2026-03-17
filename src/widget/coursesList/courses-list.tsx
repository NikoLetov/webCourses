import { Card } from '@/entity/card'
import { useState } from 'react'
import styles from './courses-list.module.scss'
import { COURSES_ITEMS } from './data'

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
