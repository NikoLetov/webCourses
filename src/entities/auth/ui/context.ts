import { createContext } from 'react'
import type { AuthSession } from '../api/type'

type AuthContextType = {
	user: AuthSession | null
	setUser: (user: AuthSession | null) => void
}
export const AuthContext = createContext<AuthContextType | null>(null)
