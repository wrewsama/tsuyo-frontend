import { useAuthContext } from "./useAuthContext"

/**
 * Hook for logging the user out.
 * 
 * @returns The logout function.
 */
export const useLogout = () => {
    const { dispatch } = useAuthContext()

    /**
     * Logs the user out.
     * 
     * Removes the user from local storage and updates the Auth Context
     * accordingly.
     */
    const logout = () => {
        localStorage.removeItem('user')

        dispatch({ type: 'LOGOUT' })
    }
    return { logout }
}