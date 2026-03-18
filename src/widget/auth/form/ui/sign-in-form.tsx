import { AuthService } from '@/entity/auth/auth.services'
import { useRouter } from '@tanstack/react-router'
import { Button, Card, Form, Input, Typography } from 'antd'
import { useFormik } from 'formik'
import styles from './form.module.scss'

export const SignInForm = () => {
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: async (val) => {
			const result = await AuthService.SignIn(val)
			if (result) {
				router.history.back()
				console.log(router.history)
			}
		}
	})

	return (
		<Card
			title={<Typography.Title level={2}>Sign In</Typography.Title>}
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
				<Button
					htmlType="submit"
					className={styles.button}
				>
					Sign in
				</Button>
			</form>
		</Card>
	)
}
