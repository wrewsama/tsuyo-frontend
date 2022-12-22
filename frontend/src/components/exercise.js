import React, { useState, useEffect } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'
import DataService from '../services/exercise'

export default function Exercise() {
    const [exercise, setExercise] = useState({})
    const { id } = useParams()

    useEffect(() => {
        DataService.findExerciseById(id)
        .then(res => {
            setExercise(res.data)
        })
        .catch(e => {
            console.error(e)
        })
    }, [])

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

            <Outlet />
        </div>
        
    )
}
