import React, { useState, useEffect } from 'react'
import DataService from '../services/exercise'
import "bootstrap/dist/css/bootstrap.min.css" 
import ExerciseListItem from './exercise-list-item'

const ExercisesList = () => {
    const [exercises, setExercises] = useState([])
    const [query, setQuery] = useState("")

    const retrieveExercises = () => {
        DataService.getAllExercises()
            .then(res => {
                console.log(res.data)
                setExercises(res.data.exercises)
            })
            .catch(e => {
                console.error(e)
            })
    }

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            console.log(query)
        }
    }

    useEffect(() => {
        retrieveExercises()
    }, [])
    
    
    return (
        <div className="container">
            <div className = "row text-center">
                <h3>
                Exercises
                </h3>
            </div>

            <div className="form-outline">
                <input type="search"
                       id="form1"
                       className="form-control"
                       placeholder="Search"
                       aria-label="Search"
                       onChange={event => setQuery(event.target.value)}
                       onKeyDown={handleKeyDown}/>
            </div>

            <div className = "box">
            {exercises.map(exercise => {
                return <ExerciseListItem key={exercise._id} exercise={exercise} />
            })}
            </div>

        </div>
    )
}

export default ExercisesList