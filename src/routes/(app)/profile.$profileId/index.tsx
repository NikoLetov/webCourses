import { AuthService } from '@/entities/auth'
import {
	isRedirect,
	redirect,
	createFileRoute
} from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/profile/$profileId/')({
	component: RouteComponent,
	beforeLoad: async ({ params }) => {
		try {
			const session = await AuthService.getSession()
			const { profileId } = params
			if (!session) {
				throw new Error()
			}

			if (profileId !== session.id) {
				throw redirect({
					to: '/news',
					search: { redirect: location.href }
				})
			}
		} catch (error) {
			console.error('Failed to load session:', error)

			if (isRedirect(error)) throw error

			throw redirect({
				to: '/news',
				search: { redirect: location.href }
			})
		}
	}
})

function RouteComponent() {
	return <div>Hello "/profile/$profileId/"!</div>
}
