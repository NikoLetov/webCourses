import { AppLayout } from '@/app/layout/layout'
import { Header } from '@/widget/header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<AppLayout
			header={<Header />}
			main={<Outlet />}
			footer={<div>footer</div>}
		/>
	)
}
