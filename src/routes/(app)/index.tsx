import { Container } from '@/shared/ui/container'
import { CoursesList } from '@/widget/coursesList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/')({
	component: CoursesPage
})

function CoursesPage() {
	return (
		<Container>
			<CoursesList />
		</Container>
	)
}
