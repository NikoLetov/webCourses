import { AuthContext } from '@/entities/auth'
import type { AuthSession } from '@/entities/auth/api/type'
import { useState } from 'react'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthSession | null>(null)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}
