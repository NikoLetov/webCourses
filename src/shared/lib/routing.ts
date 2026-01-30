import type { FileRoutesByTo } from '@/routeTree.gen'

type RouterTest = {
	label: string
	to: keyof FileRoutesByTo
}

export const ROUTES_MAP: RouterTest[] = [
	{
		label: 'Главная',
		to: '/app'
	},
	{
		label: 'О нас',
		to: '/app/about'
	},
	{
		label: 'Новости',
		to: '/app/news'
	}
]
