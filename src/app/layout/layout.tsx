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
		<div className="flex flex-col min-h-screen bg-linear-to-br from-emerald-100 via-teal-100 to-green-200">
			{header}
			<main className="flex pt-10 justify-center flex-1 shrink-0">{main}</main>
			{footer}
		</div>
	)
}
