import type { FileRoutesByTo } from '@/routeTree.gen'

type RouterTest = {
	label: string
	to: keyof FileRoutesByTo
}

export const ROUTES_MAP: RouterTest[] = [
	{
		label: 'Главная',
		to: '/'
	},
	{
		label: 'О нас',
		to: '/about'
	},
	{
		label: 'Новости',
		to: '/news'
	}
]
