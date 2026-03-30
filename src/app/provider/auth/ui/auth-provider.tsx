import { type AuthSession } from '@/entity/auth/type.api'
import { useState } from 'react'
import { AuthContext } from '../model/context'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthSession | null>(null)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}
