import React, { useState, useEffect } from 'react'
import DataService from '../services/exercise'
import "bootstrap/dist/css/bootstrap.min.css" 
import ExerciseListItem from './exercise-list-item'

const ExercisesList = () => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        retrieveExercises()
    }, [])

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
    
    return (
        <div className="container">
            <div className = "row text-center">
                <h3>
                Exercises
                </h3>
            </div>

            <div class="form-outline">
                <input type="search" id="form1" class="form-control" placeholder="Search" aria-label="Search" />
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