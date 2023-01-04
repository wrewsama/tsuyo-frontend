import { AuthContext } from '../context/auth-context'
import { useContext } from "react"

/**
 * Hook that consumes the auth context.
 */
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider!')
    }

    return context
}