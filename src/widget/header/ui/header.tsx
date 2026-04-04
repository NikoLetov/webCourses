import { useAuth } from '@/entities/auth/model/use-auth'
import { ROUTES_MAP } from '@/shared/lib/routing'
import { Avatar } from '@/shared/ui/avatar'
import { Link } from '@tanstack/react-router'

export const Header = () => {
	const { user } = useAuth()

	return (
		<header className="sticky left-0 top-0 flex justify-center items-center w-full h-16 z-10">
			<nav className="w-full flex justify-between border-0 bg-white py-5 px-4 rounded-4xl shadow-2xl">
				<ul className="flex gap-7 text-2xl items-center">
					{ROUTES_MAP &&
						ROUTES_MAP.map((item) => (
							<Link
								to={item.to}
								key={item.label}
							>
								{item.label}
							</Link>
						))}
				</ul>
				{user ? (
					<Avatar user={user} />
				) : (
					<div className="flex gap-4 text-2xl">
						<Link to="/auth/register">Sign Up</Link>
						<Link to="/auth/login">Sign in</Link>
					</div>
				)}
			</nav>
		</header>
	)
}
