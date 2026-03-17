import { Button, Card, Form, Input, Typography } from 'antd'
import { useFormik } from 'formik'
import styles from './form.module.scss'

export const SignInForm = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: (val) => {
			console.log(val)
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
