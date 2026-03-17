import { SignInForm } from '@/widget/auth/form'
import { AuthLayout } from '@/widget/auth/layout'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/login')({
	component: RouteComponent
})

function RouteComponent() {
	return <AuthLayout form={<SignInForm />} />
}
