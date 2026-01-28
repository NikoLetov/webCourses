export const LayoutPage = ({
	header,
	main,
	footer
}: {
	header: React.ReactNode
	main: React.ReactNode
	footer?: React.ReactNode
}) => {
	return (
		<div>
			{header}
			<main>{main}</main>
			{footer}
		</div>
	)
}
