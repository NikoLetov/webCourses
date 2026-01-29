import { AppLayout } from '@/app/layout/layout'
import { Header } from '@/widget/header'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
	component: () => (
		<AppLayout
			header={<Header />}
			main={<Outlet />}
			footer={<div>footer</div>}
		/>
	)
})
