import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

/**
 * Sign up page.
 */
export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()
    
    /**
     * Uses the useSignup hook to sign the user up.
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <div className="container">
            {
                error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )
            }

            <form onSubmit={handleSubmit}>
                <div className="row text-center">
                    <h3>Sign up</h3>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="exercise-name" className="form-label">Email</label>
                    <input type="text"
                        id="exercise-name"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>    
                    </input>
                </div>

                <div className="form-group">
                    <label htmlFor="exercise-desc" className="form-label">Password</label>
                    <input type="text"
                        id="exercise-desc"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>    
                    </input>
                </div>

                <button className="btn btn-primary mt-2 float-end"
                        disabled={isLoading}>
                    Sign Up
                </button>                
            </form>
            
        </div>
    )
}
