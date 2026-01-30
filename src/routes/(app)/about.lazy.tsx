import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(app)/about')({
	component: AboutPage
})

function AboutPage() {
	return <div>Hello "/about"!</div>
}
