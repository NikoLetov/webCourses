import { AppLayout } from '@/app/layout/layout'
import { AuthService } from '@/entities/auth'
import type { AuthSession } from '@/entities/auth/api/type.api'
import { useAuth } from '@/entities/auth/model/use-auth'
import { Header } from '@/widget/header'
import { Outlet, createFileRoute, useLoaderData } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'

export const Route = createFileRoute('/(app)')({
	loader: async (): Promise<AuthSession | null> => {
		try {
			const session = await AuthService.getSession()
			return session
		} catch (error) {
			console.error('Failed to load session:', error)
			return null
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
	const { setUser } = useAuth()

	useLayoutEffect(() => {
		setUser(user)
	}, [setUser, user])

	return (
		<AppLayout
			header={<Header />}
			main={<Outlet />}
			footer={<div>footer</div>}
		/>
	)
}
