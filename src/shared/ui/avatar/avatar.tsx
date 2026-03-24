import type { AuthSession } from '@/entity/auth/type.api'
import { UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space } from 'antd'

export const Avatar = ({ user }: { user: AuthSession }) => {
	return (
		<Space.Compact>
			<Button>{user.email}</Button>
			<Dropdown
				// menu={}
				placement="bottomRight"
				disabled
			>
				<Button icon={<UserOutlined />} />
			</Dropdown>
		</Space.Compact>
	)
}
