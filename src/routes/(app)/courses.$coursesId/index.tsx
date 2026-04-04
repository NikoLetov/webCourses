import type {
	ICoursesItem,
	UserComment
} from '@/entities/card-item/ui/card-preview'
import { Container } from '@/shared/ui/container'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Button, Card } from 'antd'
import { useState } from 'react'

export const Route = createFileRoute('/(app)/courses/$coursesId/')({
	loader: async ({ params, abortController }) => {
		try {
			const response = await fetch(
				`http://localhost:3000/courses/${params.coursesId}`,
				{
					method: 'GET',
					signal: abortController.signal
				}
			)
			if (!response.ok) throw new Error('Failed to fetch')
			return await response.json()
		} catch (error) {
			console.error('Loader error:', error)
			throw error
		}
	},
	component: RouteComponent
})

function RouteComponent() {
	const data: ICoursesItem = useLoaderData({
		from: '/(app)/courses/$coursesId/'
	})

	const [isReviews, setIsReviews] = useState(true)

	const handleToggleReviews = () => {
		setIsReviews((cur) => !cur)
	}

	return (
		<Container>
			<Card
				title={data.name}
				cover={
					<img
						src={data.img}
						alt="grenb"
						style={{ height: '500px' }}
					/>
				}
				actions={[
					<Button type="link">Купить подписку</Button>,
					<Button type="link">Добавить в избранное</Button>,
					<Button
						type="link"
						onClick={handleToggleReviews}
					>
						{isReviews ? 'Скрыть отзывы' : 'Показать отзывы'}
					</Button>
				]}
			>
				<Card.Meta description={data.description} />
			</Card>
			{data.reviews && isReviews && <CardCommentList items={data.reviews} />}
		</Container>
	)
}

const CardCommentList = ({ items }: { items: UserComment[] }) => {
	return (
		<ul>
			{items &&
				items.map((item) => (
					<CardCommentItem
						key={item.username}
						item={item}
					/>
				))}
		</ul>
	)
}
const CardCommentItem = ({ item }: { item: UserComment }) => {
	return (
		<li key={item.username}>
			<div>name:{item.username}</div>
			<div>comment:{item.comment}</div>
		</li>
	)
}
