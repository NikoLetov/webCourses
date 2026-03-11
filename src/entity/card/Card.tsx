import type { ICoursesItem } from '@/widget/coursesList/data'
import styles from './Card.module.scss'

export const Card = ({ item }: { item: ICoursesItem }) => {
	return (
		<li
			className={styles.card}
			key={item.id}
		>
			<div>{item.name}</div>
			<img
				src={item.img || ''}
				alt="1"
			/>
			<div>{item.description}</div>
			<div>{item.rating}</div>
		</li>
	)
}
