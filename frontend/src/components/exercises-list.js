import React, { useState, useEffect } from 'react'
import DataService from '../services/exercise'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap'
import ExerciseListItem from './exercise-list-item'
import AddExercise from './add-exercise'

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

    const retrieveFilteredExercises = searchQuery => {
        DataService.findExercise(searchQuery)
            .then(res => {
                console.log(res.data)
                setExercises(res.data.exercises)
            })
            .catch(e => {
                console.error(e)
            })
    }

    const handleQueryChange = event => {
        setQuery(event.target.value)
        if (event.target.value === '') {
            retrieveExercises()
        }
        
    }

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            retrieveFilteredExercises(query)
        } else if (event.key === "Escape") {
            setQuery("")
        }
    }

    useEffect(() => {
        retrieveExercises()
    }, [])

    return (
        <div className="container">
            <div className = "row">
                <div className="col-11">
                    <h3>
                    Exercises
                    </h3>
                </div>
                <div className="col-1">
                    <button className='btn btn-primary'
                            data-bs-toggle="modal"
                            data-bs-target="#add-exercise">
                        +
                    </button>
                    <AddExercise updateListFunction={retrieveExercises}/>
                </div>
            </div>

            <div className="row">
                <div className="form-outline">
                    <input type="search"
                        id="form1"
                        className="form-control"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={handleQueryChange}
                        onKeyDown={handleKeyDown}/>
                </div>
            </div>

            <div className="row">
                <div className = "btn-group-vertical" >
                {exercises.map(exercise => {
                    return <ExerciseListItem key={exercise._id} exercise={exercise} />
                })}
                </div>
            </div>

        </div>
    )
}

export default ExercisesList