import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from '../hooks/useAuthContext';

export default function MainNavbar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()
    }

    return (
        <nav className="navbar navbar-expand">
            <div className="container">
                <Link to='/' className = "navbar-brand"> tsuyo </Link>

                {
                    user ? (
                        <div className="container">
                            <ul className="navbar-nav">
                                <li className="navbar-text ms-auto">
                                    {user.email}
                                </li>
                                <li className="nav-item">
                                    <button className="btn"
                                            onClick={handleLogout}>
                                        Log out
                                    </button>
                                </li>
                            </ul>
                            
                        </div>
                    ) : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button className="btn"
                                        onClick={handleLogout}>
                                    Log out
                                </button>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Log in</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/signup" className="nav-link">Sign Up</Link>
                            </li>
                        </ul>
                    )
                }
            </div>
        </nav>
    )
}
