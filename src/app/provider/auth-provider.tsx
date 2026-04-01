import { type AuthSession } from '@/entities/auth/api/type.api'
import { AuthContext } from '@/shared/ui/context/context'
import { useState } from 'react'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<AuthSession | null>(null)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}
