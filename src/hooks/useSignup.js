import React, { useState } from "react";
import { useAuthContext } from "./useAuthContext";

/**
 * Hook used to sign a new user up.
 * 
 * @returns the signup function and the error and isLoading states.
 */
export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    /**
     * Signs a new user up.
     * 
     * Sends the signup request to the backend. If successful, save the
     * jsonwebtoken to localstorage and update the auth context with the
     * new user.
     * 
     * @param {String} email
     * @param {String} password
     */
    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://tsuyo-api.onrender.com/api/v1/user/signup', {
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
    return { signup, isLoading, error }
}