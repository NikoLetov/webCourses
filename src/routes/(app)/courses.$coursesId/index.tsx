import { CardCommentsList } from '@/entities/course'
import type { CoursesItem } from '@/entities/course/ui/type'
import { Container } from '@/shared/ui/container'
import { MyErrorFallback } from '@/shared/ui/error'
import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { Button, Card } from 'antd'
import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

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
	const data: CoursesItem = useLoaderData({
		from: '/(app)/courses/$coursesId/'
	})

	const [isReviews, setIsReviews] = useState(false)

	const handleToggleReviews = () => {
		setIsReviews((cur) => !cur)
	}

	return (
		<Container>
			<ErrorBoundary FallbackComponent={MyErrorFallback}>
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
				{isReviews && <CardCommentsList items={data.reviews} />}
			</ErrorBoundary>
		</Container>
	)
}
