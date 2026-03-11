import { Card } from '@/entity/card'
import { useState } from 'react'
import styles from './CoursesList.module.scss'
import { COURSES_ITEMS } from './data'

export const CoursesList = () => {
	const [courses, _] = useState(() => COURSES_ITEMS)

	if (!courses.length) {
		return <div>Список на данный момент пуст</div>
	}

	return (
		<ul className={styles.list}>
			{courses && courses.map((item) => <Card item={item} />)}
		</ul>
	)
}
