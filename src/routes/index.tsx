import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
	component: App
})

function App() {
	return <>Niko create best in the best App</>
}
