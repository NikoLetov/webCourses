import { CoursesFilterForm, CoursesList } from '@/entities/courses'
import type { FilterCourses, ICoursesItem } from '@/entities/courses/ui/types'
import { Container } from '@/shared/ui/container'
import { MyErrorFallback } from '@/shared/ui/error'
import { createFileRoute } from '@tanstack/react-router'
import { Suspense, useCallback, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createFileRoute('/(app)/')({
	component: CoursesPage
})

async function fetchCourses(params: FilterCourses): Promise<ICoursesItem[]> {
	const response = await fetch(
		`http://localhost:3000/courses?name:contains=${params.title}&_sort=${params.sort}`,
		{
			method: 'GET',
			signal: params.signal
		}
	)
	if (!response.ok) {
		throw new Error()
	}

	const data = await response.json()
	return data
}

function CoursesPage() {
	const [promise, setPromise] = useState(() =>
		fetchCourses({ title: '', sort: '-rating' })
	)

	const handleFilterChange = useCallback((params: FilterCourses) => {
		setPromise(fetchCourses(params))
	}, [])

	return (
		<Container>
			<CoursesFilterForm onChange={handleFilterChange} />
			<ErrorBoundary FallbackComponent={MyErrorFallback}>
				<Suspense fallback={<div>Loading...</div>}>
					<CoursesList data={promise} />
				</Suspense>
			</ErrorBoundary>
		</Container>
	)
}
