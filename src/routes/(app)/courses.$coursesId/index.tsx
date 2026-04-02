import type { ICoursesItem } from '@/entities/card-item/ui/card-preview'
import { Container } from '@/shared/ui/container'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Button, Card } from 'antd'
import { Meta } from 'antd/es/list/Item'
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
				<Meta description={data.description} />
				<Meta
					description={
						isReviews &&
						data.reviews?.map((item) => (
							<div key={item.username}>{item.comment}</div>
						))
					}
				/>
			</Card>
		</Container>
	)
}
