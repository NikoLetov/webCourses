import { Container } from '@/shared/ui/container'
import { CoursesList } from '@/widget/coursesList'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'

export const Route = createFileRoute('/(app)/')({
	component: CoursesPage
})

const data = fetch('http://localhost:3000/courses', {
	method: 'GET'
}).then((item) => item.json())

function CoursesPage() {
	return (
		<Container>
			<Suspense fallback={<div>Loading...</div>}>
				<CoursesList data={data} />
			</Suspense>
		</Container>
	)
}
