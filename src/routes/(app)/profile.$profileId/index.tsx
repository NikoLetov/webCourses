import type { UserType } from '@/entities/auth/api/type'
import { AuthService } from '@/features/auth'
import { ProfileServices } from '@/features/profile/api/profile.services'
import { UnauthorizedError } from '@/shared/api/types'
import {
	createFileRoute,
	isRedirect,
	redirect,
	useLoaderData
} from '@tanstack/react-router'
import { Button } from 'antd'
import Card from 'antd/es/card/Card'
import Input from 'antd/es/input/Input'
import { useFormik } from 'formik'
import { useState } from 'react'

export const Route = createFileRoute('/(app)/profile/$profileId/')({
	component: RouteComponent,
	loader: async ({ params }) => {
		try {
			const response = await fetch(
				`http://localhost:3000/user/${params.profileId}`,
				{
					method: 'GET'
				}
			)
			if (!response.ok) throw new Error('Failed to fetch')
			return await response.json()
		} catch (error) {
			console.error('Loader error profile')
			throw error
		}
	},
	beforeLoad: async ({ params }) => {
		try {
			const session = await AuthService.getSession()
			const { profileId } = params
			if (!session) {
				throw new UnauthorizedError()
			}
			if (profileId !== session.id) {
				throw redirect({
					to: '/news',
					search: { redirect: location.href }
				})
			}
		} catch (error) {
			console.error('Failed to load session:', error)

			if (isRedirect(error)) throw error

			throw redirect({
				to: '/news',
				search: { redirect: location.href }
			})
		}
	}
})

function RouteComponent() {
	const data: UserType = useLoaderData({
		from: '/(app)/profile/$profileId/'
	})

	const [preview, setPreview] = useState<string | undefined>(data.avatar)

	const handleAvatarChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		setFieldValue: (field: string, value: unknown) => void
	) => {
		e.preventDefault()
		const target = e.currentTarget.files?.[0]
		if (target) {
			const image = await convertToBase64(target)
			const preview = URL.createObjectURL(target)
			setFieldValue('avatar', image)
			setPreview(preview)
		}
	}

	const {
		setFieldValue,
		handleSubmit,
		handleChange,
		handleBlur,
		isSubmitting,
		values
	} = useFormik({
		initialValues: {
			name: data?.name || '',
			email: data?.email || '',
			avatar: data?.avatar || undefined
		},
		enableReinitialize: true,
		onSubmit: async (values, { setSubmitting }) => {
			try {
				const result = await ProfileServices.update(values, data.id)
				if (result.success) {
					console.log('EZ win +25')
				}
			} catch (error) {
				console.error('Submit error:', error)
			} finally {
				setSubmitting(false)
			}
		}
	})
	return (
		<Card
			title="Profile"
			variant="borderless"
			style={{ width: '80%', height: 'calc(100vh - 130px)' }}
			styles={{
				root: {
					height: '100%',
					display: 'flex',
					flexDirection: 'column'
				},
				body: {
					flex: 1,
					overflow: 'auto'
				},
				actions: {
					marginTop: 'auto',
					flexShrink: 0
				}
			}}
			actions={[
				<Button
					htmlType="submit"
					disabled={isSubmitting}
					form="form"
					type="dashed"
					className="min-w-full"
				>
					{isSubmitting ? 'Сохранение...' : 'Save'}
				</Button>
			]}
		>
			<form
				onSubmit={handleSubmit}
				id="form"
			>
				<div>
					<img
						src={preview ?? '/avatar-unknown.jpg'}
						alt="avatar"
					/>
				</div>
				<div>
					<label>Avatar</label>
					<Input
						type="file"
						accept="image/*"
						onChange={(e) => handleAvatarChange(e, setFieldValue)}
						name="avatar"
					/>
				</div>

				<div>
					<label>Name</label>
					<Input
						name="name"
						value={values.name}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Введите имя"
					/>
				</div>

				<div>
					<label>Email</label>
					<Input
						name="email"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Введите email"
					/>
				</div>
			</form>
		</Card>
	)
}

const convertToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => {
			if (typeof reader.result === 'string') {
				resolve(reader.result)
			} else {
				reject(new Error('Failed to convert file to Base64'))
			}
		}
		reader.onerror = reject
		reader.readAsDataURL(file)
	})
}
