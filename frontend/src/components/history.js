import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DataService from '../services/exercise'
import WorkoutItem from './workout-item'

/**
 * A container for the history of Sets and Workouts for this Exercise.
 */
export default function History() {
    const [listOfWorkoutItems, setListOfWorkoutItems] = useState([])
    const params = useParams()
    const exerciseId = params.id

    /**
     * Updates the state of the listOfWorkoutItems.
     * 
     * Gets the exercise id from the url params and sends a http get request
     * with the id. Then, copies the array of Sets from the response,
     * groups them by workoutId, and updates the list of workout items.
     */
    const retrieveWorkoutItems = () => {
        DataService.getSetsByExerciseId(exerciseId)
            .then(res => {
                const copiedSetsList = [...res.data.sets]
                const groupedSetsList = copiedSetsList.reduce((prev, curr) => {
                    if (prev[curr.workoutId]) {
                        prev[curr.workoutId].push(curr)
                    } else {
                        prev[curr.workoutId] = [curr] 
                    }
                    return prev
                }, {})
                const newListOfWorkoutItems = Object.entries(groupedSetsList)
                setListOfWorkoutItems(newListOfWorkoutItems)
            })
            .catch(e => {
                console.error(e)
            })
    }

    /**
     * Updates the state of the listOfWorkoutItems when the page first renders.
     */
    useEffect(() => {
        retrieveWorkoutItems()
    }, [])

    return (
        <div className="container">
            <ul className="list-group">
                {listOfWorkoutItems.map(item => {
                    return (
                        <li key = {item[0]} className="list-group-item">
                            <WorkoutItem workoutId={item[0]} listOfSets={item[1]} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
