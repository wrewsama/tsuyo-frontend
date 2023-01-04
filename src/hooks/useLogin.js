import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";

/**
 * Hook used to log the user in.
 * 
 * @returns the login function and the error and isLoading states.
 */
export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    /**
     * Logs the user in.
     * 
     * Sends the login request to the backend. If successful, save the
     * jsonwebtoken to localstorage and update the auth context with the
     * logged in user.
     * 
     * @param {String} email 
     * @param {String} password 
     */
    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://tsuyo-api.onrender.com/api/v1/user/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)

        } else {
            // save jwt to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update auth context
            dispatch({
                type: 'LOGIN',
                payload: json
            })
            setIsLoading(false)
        }
    }
    return { login, isLoading, error }
}