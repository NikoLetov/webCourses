import { MyErrorFallback } from '@/shared/ui/error'
import { SignUpForm } from '@/widget/auth/form'
import { AuthLayout } from '@/widget/auth/layout'
import { createLazyFileRoute } from '@tanstack/react-router'
import { ErrorBoundary } from 'react-error-boundary'

export const Route = createLazyFileRoute('/auth/register')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<AuthLayout
			form={
				<ErrorBoundary FallbackComponent={MyErrorFallback}>
					<SignUpForm />
				</ErrorBoundary>
			}
		/>
	)
}
