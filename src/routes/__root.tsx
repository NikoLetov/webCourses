import { LayoutPage } from '@/app/layout'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
	component: () => (
		<LayoutPage
			header={
				<div>
					<Link to="/">Главная</Link>
					<Link to="/about">О нас</Link>
				</div>
			}
			main={<Outlet />}
		/>
	)
})
