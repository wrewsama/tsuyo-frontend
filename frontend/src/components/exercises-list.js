import React, { useState, useEffect } from 'react'
import DataService from '../services/exercise'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import ExerciseListItem from './exercise-list-item'
import AddExercise from './add-exercise'
import { useAuthContext } from '../hooks/useAuthContext'

/**
 * The list of the Exercises added to tsuyo.
 */
const ExercisesList = () => {
    const [exercises, setExercises] = useState([])
    const [query, setQuery] = useState("")
    const { user } = useAuthContext()

    /**
     * Gets all the Exercises from the database.
     * 
     * Sends a get request to the backend API, takes the array of exercises
     * from the response, then updates the exercises state with it.
     */
    const retrieveExercises = (token) => {
        DataService.getAllExercises(token)
            .then(res => {
                setExercises(res.data.exercises)
            })
            .catch(e => {
                console.error(e)
            })
    }

    /**
     * Gets all the Exercises with names matching a given query.
     * 
     * Sends a get request to the backend API with the given search query,
     * takes the array of exercises from the response, then updates the
     * exercises state with it.
     * 
     * @param {String} searchQuery The query that exercise names must match.
     */
    const retrieveFilteredExercises = (searchQuery, token) => {
        DataService.findExercise(searchQuery, token)
            .then(res => {
                setExercises(res.data.exercises)
            })
            .catch(e => {
                console.error(e)
            })
    }

    /**
     * Updates the query state when text is added in the search bar.
     * 
     * When text is added in the search bar, update the query state to that
     * text. Also if the text is cleared, reload the full list of exercises
     * automatically.
     */
    const handleQueryChange = event => {
        setQuery(event.target.value)
        if (event.target.value === '') {
            retrieveExercises()
        }
        
    }

    /**
     * Handles the user's keypresses.
     * 
     * If the user presses enter, retrieve the filtered exercises using
     * the current state of query. If the user presses escape, set the query
     * state to the empty string.
     */
    const handleKeyDown = event => {
        if (event.key === "Enter") {
            retrieveFilteredExercises(query)
        } else if (event.key === "Escape") {
            setQuery("")
        }
    }

    /**
     * Load in all the exercises when the page is first rendered.
     */
    useEffect(() => {
        if (user) {
            retrieveExercises(user.token)
        }
        
    }, [user])

    return (
        <div className="container">
            <div className = "row">
                <div className="col">
                    <h3>
                    Exercises
                    </h3>
                </div>
                <div className="col">
                    <button className='btn btn-primary float-end'
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
                        return <ExerciseListItem key={exercise._id}
                                                exercise={exercise}
                                                updateListFunction={retrieveExercises}/>
                    })}
                </div>
            </div>
        </div>
    )
}

export default ExercisesList