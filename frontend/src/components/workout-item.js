import React, { useState, useEffect } from 'react'
import DataService from '../services/exercise'
import { v4 as uuidv4 } from 'uuid'

/**
 * Container representing 1 group of sets.
 * 
 * @param {String} workoutId The id of the workout that these sets belong to.
 * @param {Array} listOfSets The group of sets belonging to this workout.
 * @param {Function} updateListFunction Callback function to update the list
 *                                      of workout items in the history page.
 */
export default function WorkoutItem({ workoutId, listOfSets, updateListFunction }) {
    // placeholder date used to avoid getDate error
    const [workout, setWorkout] = useState({date: "YYYY-mm-ddTHH:MM:ssZ"})

    /**
     * Retrieves and sets the current workout by the workoutId.
     */
    useEffect(() => {
        DataService.getWorkoutById(workoutId)
            .then(res => {
                setWorkout(res.data)
            })
            .catch(e => {
                console.error(e)
            })
    }, [])

    /**
     * Parses the date saved in a given workout.
     * 
     * @param {Object} workout 
     * @returns Object containing the date and time as Strings.
     */
    const getDate = (workout) => {
        const date = workout.date
        const idx = date.indexOf('T')
        const hours = (parseInt(date.slice(idx+1, idx+3)) + 8).toString()
        const minutes = date.slice(idx+4, idx+6)
        return {
            dayMonthYear: date.slice(0, idx),
            time: hours + ":" + minutes
        }
        
    }

    const onDeleteClick = event => {
        DataService.deleteWorkout(workoutId) // delete the workout
            .then(res => {
                // then delete all sets belonging to this workout
                let itemsProcessed = 0
                listOfSets.forEach(set => {
                    DataService.deleteSet(set._id)
                        .then(res => {
                            itemsProcessed++

                            // if all sets have been deleted, update the list
                            if (itemsProcessed === listOfSets.length) {
                                updateListFunction()
                            }
                        })
                });
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col fw-bold align-baseline">
                    {getDate(workout).dayMonthYear}
                </div>

                <div className="col fw-bold text-end align-middle">
                    {getDate(workout).time}
                </div>

                <div className="col-1 btn-group">
                    <button type="button"
                            className="btn dropdown-toggle btn-sm"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"></button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target={`#edit${workoutId}`}>Edit</button></li>
                        <li><hr className="dropdown-divider"></hr></li>
                        <li><button className="dropdown-item" onClick={onDeleteClick}>Delete</button></li>
                    </ul>
                    
                </div>
            </div>
            <div className="list-group list-group-flush">
                {
                    listOfSets.map(set => {
                        return (
                            <div key={uuidv4()} className="list-group-item">
                                {set.weight} kg x {set.reps} reps
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
