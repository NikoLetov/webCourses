import type { InfinityFetch } from '@/entities/course/api/types'
import { Input, Select } from 'antd'
import { type FormikValues } from 'formik'
import { useFilterForm } from '../model/use-filter'

export const CoursesFilterForm = ({
	onChange,
	form
}: {
	onChange: (params: InfinityFetch, signal?: AbortSignal) => void
	form: FormikValues
}) => {
	const { isPending } = useFilterForm(onChange, form.values)

	return (
		<div className="bg-white rounded-2xl p-4">
			<form
				onSubmit={form.handleSubmit}
				className="flex flex-col gap-2"
			>
				<Input
					name="title"
					placeholder="Поиск"
					onChange={form.handleChange}
					value={form.values.title}
				/>
				<Select
					value={form.values.sort}
					onChange={(value) => form.setFieldValue('sort', value)}
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
