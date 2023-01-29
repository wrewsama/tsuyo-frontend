import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

/**
 * The app's log in page.
 */
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()
    
    /**
     * Uses the useLogin hook to log the user in.
     */
    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
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
                    <h3>Log in</h3>
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

                <button className="btn btn-primary mt-3 float-end"
                        disabled={isLoading}>
                    {
                        isLoading && (
                            <span class="spinner-border spinner-border-sm"></span>
                        )
                    }
                    Log in
                </button>
            </form>
        </div>
    )
}
