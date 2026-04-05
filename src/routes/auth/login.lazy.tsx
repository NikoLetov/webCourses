import { MyErrorFallback } from '@/shared/ui/error'
import { SignInForm } from '@/widget/auth/form'
import { AuthLayout } from '@/widget/auth/layout'
import { createLazyFileRoute } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createLazyFileRoute('/auth/login')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<AuthLayout
			form={
				<ErrorBoundary FallbackComponent={MyErrorFallback}>
					<SignInForm />
				</ErrorBoundary>
			}
		/>
	)
}
