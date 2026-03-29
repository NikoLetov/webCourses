import { AppLayout } from '@/app/layout/layout'
import { Header } from '@/widget/header'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)')({
	// loader: async (): Promise<AuthSession | undefined> => {
	// 	try {
	// 		const session = await AuthService.getSession()
	// 		if (!session) {
	// 			return undefined
	// 		}
	// 		const data: UserType =
	// 			typeof session.value !== 'undefined' && JSON.parse(session.value)
	// 		return data
	// 	} catch (error) {
	// 		console.error('Failed to load session:', error)
	// 		return undefined
	// 	}
	// },
	// pendingComponent: () => (
	// 	<AppLayout
	// 		header={<div>Header</div>}
	// 		main={<div>Загрузка...</div>}
	// 		footer={<div>footer</div>}
	// 	/>
	// ),
	component: RouteComponent
	// gcTime: 0
})

function RouteComponent() {
	// const user = useLoaderData({ from: '/(app)' })
	// console.log(user)
	return (
		<AppLayout
			header={<Header user={null} />}
			main={<Outlet />}
			footer={<div>footer</div>}
		/>
	)
}
