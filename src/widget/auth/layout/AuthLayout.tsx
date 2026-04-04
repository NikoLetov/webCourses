import { Container } from '@/shared/ui/container'

export const AuthLayout = ({ form }: { form: React.ReactNode }) => {
	return (
		<div className="w-full min-h-screen flex justify-center">
			<Container>
				<div className="w-full h-full flex justify-center items-center">
					{form}
				</div>
			</Container>
		</div>
	)
}
