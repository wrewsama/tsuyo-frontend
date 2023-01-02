import React, { useState, useEffect } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'
import DataService from '../services/exercise'
import { useAuthContext } from '../hooks/useAuthContext'

/**
 * Layout for the /:id route.
 * 
 * Includes the Exercise's name as a header, as well as a navbar allowing
 * for navigation between the New, Header, and Graph sections. Also passes
 * the exercise object as the Outlet context.
 */
export default function Exercise() {
    const [exercise, setExercise] = useState({})
    const { id } = useParams()
    const { user } = useAuthContext()

    /**
     * Sets the exercise state to the correct exercise object.
     * 
     * Gets the id from the url params, then sends a http get request with
     * that id to get the corresponding Exercise data from the database.
     * Then update the exercise state using that data. This is called
     * the first time the page is rendered.
     */
    useEffect(() => {
        if (user) {
            DataService.findExerciseById(id, user.token)
            .then(res => {
                setExercise(res.data)
            })
            .catch(e => {
                console.error(e)
            })
        }
    }, [user])

    return (
        <div className="container">
            <div className="row text-center">
                <h3>{exercise.name}</h3>
            </div>

            <ul className="nav justify-content-center">
                <li className="nav-item mx-5">
                    <Link className="nav-link" to={`/${id}`}>New</Link>
                </li>
                <li className="nav-item mx-5">
                    <Link className="nav-link" to={`/${id}/history`}>History</Link>
                </li>
                <li className="nav-item mx-5">
                    <Link className="nav-link" to={`/${id}/graph`}>Graph</Link>
                </li>
            </ul>

            <Outlet context={exercise}/>
        </div>
        
    )
}
