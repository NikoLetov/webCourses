import { AppLayout } from '@/app/layout/layout'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
	component: () => (
		<AppLayout
			header={
				<div>
					<Link to="/">Главная</Link>
					<Link to="/about">О нас</Link>
				</div>
			}
			main={<Outlet />}
			footer={<div>footer</div>}
		/>
	)
})
