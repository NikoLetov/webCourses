import { Container } from '@/shared/ui/container'
import styles from './AuthLayout.module.scss'

export const AuthLayout = ({ form }: { form: React.ReactNode }) => {
	return (
		<div className={styles.layout}>
			<Container>
				<div className={styles.inner}>{form}</div>
			</Container>
		</div>
	)
}
