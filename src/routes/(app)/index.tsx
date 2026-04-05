import { Container } from '@/shared/ui/container'
import { MyErrorFallback } from '@/shared/ui/error'
import { CoursesList } from '@/widget/coursesList'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/(app)/')({
	component: CoursesPage
})

const data = fetch('http://localhost:3000/courses', {
	method: 'GET'
}).then((item) => item.json())

function CoursesPage() {
	return (
		<Container>
			<ErrorBoundary FallbackComponent={MyErrorFallback}>
				<Suspense fallback={<div>Loading...</div>}>
					<CoursesList data={data} />
				</Suspense>
			</ErrorBoundary>
		</Container>
	)
}
