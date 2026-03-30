import type { AuthSession } from '@/entity/auth/type.api'
import { createContext } from 'react'

type AuthContextType = {
	user: AuthSession | null
	setUser: (user: AuthSession | null) => void
}
export const AuthContext = createContext<AuthContextType | null>(null)
