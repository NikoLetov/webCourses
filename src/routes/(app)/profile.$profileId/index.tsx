import { AuthService } from '@/entity/auth/auth.services'
import type { UserType } from '@/entity/auth/data'
import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/profile/$profileId/')({
	component: RouteComponent,
	beforeLoad: async ({ params }) => {
		try {
			const session = await AuthService.getSession()
			const { profileId } = params
			if (!session) {
				throw new Error()
			}

			const data: UserType =
				typeof session.value !== 'undefined' && JSON.parse(session.value)

			if (Number(profileId) !== data.id) {
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
