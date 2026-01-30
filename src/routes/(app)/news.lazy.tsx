import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(app)/news')({
	component: NewsPage
})

function NewsPage() {
	return <div>Hello "/(public)/news"!</div>
}
