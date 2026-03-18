import { AuthService } from '@/entity/auth/auth.services'
import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/test/$testId/')({
	beforeLoad: async ({ location }) => {
		try {
			const user = await AuthService.getSession()
			console.log(user)
			if (!user) {
				throw redirect({
					to: '/auth/login',
					search: { redirect: location.href }
				})
			}
		} catch (e) {
			if (isRedirect(e)) throw e

			throw redirect({
				to: '/auth/login',
				search: { redirect: location.href }
			})
		}
	},
	component: RouteComponent
})

function RouteComponent() {
	return <div>Hello "/test/$testId/"!</div>
}
