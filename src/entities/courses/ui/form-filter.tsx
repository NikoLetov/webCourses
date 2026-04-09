import { useDebounce } from '@/shared/utils/useDebounce'
import { Input, Select } from 'antd'
import { useFormik } from 'formik'
import { useEffect, useTransition } from 'react'
import type { FilterCourses } from './types'

export const CoursesFilterForm = ({
	onChange
}: {
	onChange: (params: FilterCourses) => void
}) => {
	const { formik, isPending } = useFilterForm(onChange)
	return (
		<div className="bg-white rounded-2xl p-4">
			<form
				onSubmit={formik.handleSubmit}
				className="flex flex-col gap-2"
			>
				<Input
					name="title"
					placeholder="Поиск"
					onChange={formik.handleChange}
					value={formik.values.title}
				/>
				<Select
					value={formik.values.sort}
					onChange={(value) => formik.setFieldValue('sort', value)}
					options={[
						{ value: 'rating', label: 'По возрастанию' },
						{ value: '-rating', label: 'По убыванию' }
					]}
				/>
				{isPending && <div>Updating...</div>}
			</form>
		</div>
	)
}

const useFilterForm = (onChange: (params: FilterCourses) => void) => {
	const formik = useFormik<FilterCourses>({
		initialValues: {
			title: '',
			sort: 'rating'
		},
		onSubmit: () => {}
	})

	const debounce = useDebounce(formik.values as FilterCourses, 500)

	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		const controller = new AbortController()
		startTransition(() => {
			onChange({
				title: debounce.title,
				sort: debounce.sort,
				signal: controller.signal
			})
		})
		return () => controller.abort()
	}, [debounce, onChange])

	return { formik, isPending }
}
