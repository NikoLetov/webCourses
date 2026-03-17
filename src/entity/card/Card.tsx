import type { ICoursesItem } from '@/widget/coursesList/data'
import { Link } from '@tanstack/react-router'
import styles from './Card.module.scss'

export const Card = ({ item }: { item: ICoursesItem }) => {
	return (
		<li
			className={styles.card}
			key={item.id}
		>
			<div className={styles.title}>{item.name}</div>
			<div className={styles.itemImg}>
				<img
					src={item.img || ''}
					alt="1"
				/>
			</div>
			<div className={styles.text}>{item.description}</div>
			<div className={styles.rating}>rating: {item.rating}</div>
			<Link
				to={'/test/$testId'}
				params={{ testId: String(item.id) }}
			>
				Подробнее...
			</Link>
		</li>
	)
}
