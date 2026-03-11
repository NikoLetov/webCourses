import type { FileRoutesByTo } from '@/routeTree.gen'

type RouterType = {
	label: string
	to: keyof FileRoutesByTo
}

export const ROUTES_MAP: RouterType[] = [
	{
		label: 'Сourses',
		to: '/'
	},
	{
		label: 'About',
		to: '/about'
	},
	{
		label: 'News',
		to: '/news'
	}
]
