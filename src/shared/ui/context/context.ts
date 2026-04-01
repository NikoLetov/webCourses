import type { AuthSession } from '@/entities/auth/api/type.api'
import { createContext } from 'react'

type AuthContextType = {
	user: AuthSession | null
	setUser: (user: AuthSession | null) => void
}
export const AuthContext = createContext<AuthContextType | null>(null)
