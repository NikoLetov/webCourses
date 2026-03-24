import type { AuthSession } from '@/entity/auth/type.api'
import { ROUTES_MAP } from '@/shared/lib/routing'
import { Avatar } from '@/shared/ui/avatar'
import { Link } from '@tanstack/react-router'
import styles from './header.module.scss'

export const Header = ({ user }: { user: AuthSession | undefined }) => {
	return (
		<header className={styles.header}>
			<nav className={styles.nav}>
				<ul className={styles.list}>
					{ROUTES_MAP &&
						ROUTES_MAP.map((item) => (
							<Link
								to={item.to}
								className={styles.item}
								key={item.label}
							>
								{item.label}
							</Link>
						))}
				</ul>
				{user ? (
					<Avatar user={user} />
				) : (
					<div className={styles.auth}>
						<Link to="/auth/register">Sign Up</Link>
						<Link to="/auth/login">Sign in</Link>
					</div>
				)}
			</nav>
		</header>
	)
}
