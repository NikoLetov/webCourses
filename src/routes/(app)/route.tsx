import { AppLayout } from '@/app/layout/layout'
import { AuthService } from '@/entity/auth/auth.services'
import type { AuthSession, UserType } from '@/entity/auth/type.api'
import { Header } from '@/widget/header'
import { Outlet, createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)')({
	loader: async (): Promise<AuthSession | undefined> => {
		try {
			const session = await AuthService.getSession()
			if (!session) {
				return undefined
			}
			const data: UserType =
				typeof session.value !== 'undefined' && JSON.parse(session.value)
			console.log(data, 'data')
			return data
		} catch (error) {
			console.error('Failed to load session:', error)
			return undefined
		}
	},
	pendingComponent: () => (
		<AppLayout
			header={<div>Header</div>}
			main={<div>Loading...</div>}
			footer={<div>footer</div>}
		/>
	),

	component: RouteComponent
})

function RouteComponent() {
	const user = useLoaderData({ from: '/(app)' })
	console.log(user)
	return (
		<AppLayout
			header={<Header user={user} />}
			main={<Outlet />}
			footer={<div>footer</div>}
		/>
	)
}
