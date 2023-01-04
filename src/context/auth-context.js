import { createContext, useReducer, useEffect } from "react"

export const AuthContext = createContext()

/**
 * Updates the user context.
 */
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

/**
 * Context used to pass down information regarding user auth.
 */
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // automatically log user in if user info is found in local storage
    // this ensures user stays logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user})
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}