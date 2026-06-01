import type { UserType, UserTypeProfile } from '@/entities/auth/api/type'
import type { ApiResponse } from '@/shared/api/types'

export const ProfileServices = {
	async update(
		data: UserTypeProfile,
		userId: string
	): Promise<ApiResponse<UserTypeProfile>> {
		const result = await fetch(`/api/user/${userId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		if (!result.ok) {
			throw new Error()
		}

		const response: UserType = await result.json()

		const { role, password, id, ...user } = response

		return { status: 200, success: true, data: user }
	}
}
