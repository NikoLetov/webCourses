import { AuthService } from '@/entities/auth'
import { useRouter } from '@tanstack/react-router'
import { Button, Card, Form, Input, Typography } from 'antd'
import { useFormik } from 'formik'

export const SignInForm = () => {
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (val) => {
			const result = await AuthService.SignIn(val)
			if (result.success) {
				router.history.back()
			}
		}
	})

	return (
		<Card
			title={<Typography.Title level={2}>Sign In</Typography.Title>}
			className="w-96 flex flex-col justify-center text-center"
		>
			<form onSubmit={formik.handleSubmit}>
				<Form.Item>
					<Input
						name="email"
						onChange={formik.handleChange}
						value={formik.values.email}
						placeholder="Email"
					/>
				</Form.Item>
				<Form.Item>
					<Input.Password
						name="password"
						onChange={formik.handleChange}
						value={formik.values.password}
						placeholder="Your Password"
					/>
				</Form.Item>
				<Button
					htmlType="submit"
					className="w-full"
				>
					Sign in
				</Button>
			</form>
		</Card>
	)
}
