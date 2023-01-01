import React, { useState } from 'react'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(email, password)
    }

    return (
        <div className="container">
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

                <button className="btn btn-primary mt-3 float-end">
                    Log in
                </button>
            </form>
        </div>
    )
}
