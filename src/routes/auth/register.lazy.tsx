import { SignUpForm } from '@/widget/auth/form'
import { AuthLayout } from '@/widget/auth/layout'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/auth/register')({
	component: RouteComponent
})

function RouteComponent() {
	return <AuthLayout form={<SignUpForm />} />
}
