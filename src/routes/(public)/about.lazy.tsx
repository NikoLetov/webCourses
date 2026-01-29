import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/(public)/about')({
	component: AboutPage
})

function AboutPage() {
	return <div>Hello "/about"!</div>
}
