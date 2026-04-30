import type { InfinityFetch } from '@/entities/course/api/types'
import { CoursesList } from '@/entities/course/ui/list'
import { CoursesFilterForm } from '@/features/course'
import { useInfinityScroll } from '@/features/course/model'
import { Container } from '@/shared/ui/container'
import { MyErrorFallback } from '@/shared/ui/error'
import { createFileRoute } from '@tanstack/react-router'
import { useFormik } from 'formik'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/(app)/')({
	component: CoursesPage
})

function CoursesPage() {
	const formik = useFormik<InfinityFetch>({
		initialValues: {
			title: '',
			per_page: '10',
			sort: '-rating'
		},
		onSubmit: () => {}
	})

	const { promise, isLoading, observerRef, handleFilterChange } =
		useInfinityScroll(formik.values, 0)

	return (
		<Container>
			<CoursesFilterForm
				onChange={handleFilterChange}
				form={formik}
			/>
			<ErrorBoundary FallbackComponent={MyErrorFallback}>
				<Suspense fallback={<div>Loading...</div>}>
					<CoursesList
						data={promise}
						ref={observerRef}
						isLoading={isLoading}
					/>
				</Suspense>
			</ErrorBoundary>
		</Container>
	)
}
