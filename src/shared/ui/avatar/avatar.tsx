import { AuthService } from '@/entity/auth/auth.services'
import type { AuthSession } from '@/entity/auth/type.api'
import { UserOutlined } from '@ant-design/icons'
import { Link, useRouter } from '@tanstack/react-router'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Space } from 'antd'

export const Avatar = ({ user }: { user: AuthSession }) => {
	const router = useRouter()

	const handleButton = async () => {
		await AuthService.SignOut()
		router.invalidate()
	}
	//TODO: хуйня!
	const items: MenuProps['items'] = [
		{
			label: (
				<Link
					to="/profile/$profileId"
					params={{ profileId: String(user.id) }}
				>
					Profile
				</Link>
			),
			key: '1'
		},
		{
			label: <Button onClick={handleButton}>Exit</Button>,
			key: '2'
		}
	]

	const menuProps = {
		items
	}

	return (
		<Space.Compact>
			<Button>{user.name}</Button>

			<Dropdown menu={menuProps}>
				<Button icon={<UserOutlined />} />
			</Dropdown>
		</Space.Compact>
	)
}
