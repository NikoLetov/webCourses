import styles from './layout.module.scss'

export const AppLayout = ({
	header,
	main,
	footer
}: {
	header: React.ReactNode
	main: React.ReactNode
	footer?: React.ReactNode
}) => {
	return (
		<div className={styles.app}>
			{header}
			<main className={styles.main}>{main}</main>
			{footer}
		</div>
	)
}
