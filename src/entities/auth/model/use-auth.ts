import { AuthContext } from '@/shared/ui/context'
import { useContext } from 'react'

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('context not in components')
	}
	return context
}
