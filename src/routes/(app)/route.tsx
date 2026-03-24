import { AppLayout } from '@/app/layout/layout'
import { AuthService } from '@/entity/auth/auth.services'
import type { AuthSession } from '@/entity/auth/type.api'
import { Header } from '@/widget/header'
import { Outlet, createFileRoute, useLoaderData } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)')({
	loader: async (): Promise<AuthSession | undefined> => {
		try {
			const session = await AuthService.getSession()
			if (!session) {
				throw new Error()
			}
			const data = session.value
			return typeof data === 'undefined' ? undefined : JSON.parse(data)
		} catch (error) {
			console.error('Failed to load session:', error)
			return undefined
		}
	},
	pendingComponent: () => (
		<AppLayout
			header={<div>Header</div>}
			main={<div>Загрузка...</div>}
			footer={<div>footer</div>}
		/>
	),
	component: RouteComponent
})

function RouteComponent() {
	const user = useLoaderData({ from: '/(app)' })
	return (
		<AppLayout
			header={<Header user={user} />}
			main={<Outlet />}
			footer={<div>footer</div>}
		/>
	)
}
