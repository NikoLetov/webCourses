import { AuthService } from '@/entity/auth/auth.services'
import { useRouter } from '@tanstack/react-router'
import { Button, Card, Form, Input, Typography } from 'antd'
import { useFormik } from 'formik'
import styles from './form.module.scss'

export const SignUpForm = () => {
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: ''
		},
		onSubmit: async (val) => {
			const { confirmPassword, ...data } = val
			void confirmPassword
			const result = await AuthService.SignUp(data)
			if (result.success) {
				formik.resetForm()
				router.navigate({
					to: '/'
				})
			}
		}
	})

	return (
		<Card
			title={<Typography.Title level={2}>Sign Up</Typography.Title>}
			className={styles.card}
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
				<Form.Item>
					<Input.Password
						name="confirmPassword"
						onChange={formik.handleChange}
						value={formik.values.confirmPassword}
						placeholder="Confirm Password"
					/>
				</Form.Item>
				<Button
					htmlType="submit"
					className={styles.button}
				>
					Sign up
				</Button>
			</form>
		</Card>
	)
}
