import { Link } from '@tanstack/react-router'
import styles from './card-preview.module.scss'

interface UserComment {
	username: string
	rating: number
	comment: string
}

export interface ICoursesItem {
	id: number
	name: string
	rating: number
	description: string
	img?: string | undefined
	reviews?: UserComment[]
}

export const CardPreview = ({ item }: { item: ICoursesItem }) => {
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
				to={'/courses/$coursesId'}
				params={{ coursesId: String(item.id) }}
			>
				Подробнее...
			</Link>
		</li>
	)
}
