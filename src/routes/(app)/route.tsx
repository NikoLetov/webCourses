import { AppLayout } from '@/app/layout/layout'
import { useAuth } from '@/app/provider/auth/model/use-auth'
import { AuthService } from '@/entity/auth/auth.services'
import type { AuthSession, UserType } from '@/entity/auth/type.api'
import { Header } from '@/widget/header'
import { Outlet, createFileRoute, useLoaderData } from '@tanstack/react-router'
import { useLayoutEffect } from 'react'

export const Route = createFileRoute('/(app)')({
	loader: async (): Promise<AuthSession | null> => {
		try {
			const session = await AuthService.getSession()
			if (!session) {
				return null
			}
			const data: UserType =
				typeof session.value !== 'undefined' && JSON.parse(session.value)

			return data
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
