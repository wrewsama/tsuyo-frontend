import React, { useState, useEffect } from 'react'
import DataService from '../services/exercise'
import { v4 as uuidv4 } from 'uuid'

/**
 * Container representing 1 group of sets.
 * 
 * @param {String} workoutId The id of the workout that these sets belong to.
 * @param {Array} listOfSets The group of sets belonging to this workout.
 */
export default function WorkoutItem({ workoutId, listOfSets }) {
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
        console.log(workout)
        const date = workout.date
        const idx = date.indexOf('T')
        const hours = (parseInt(date.slice(idx+1, idx+3)) + 8).toString()
        const minutes = date.slice(idx+4, idx+6)
        return {
            dayMonthYear: date.slice(0, idx),
            time: hours + ":" + minutes
        }
        
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col fw-bold">
                    {getDate(workout).dayMonthYear}
                </div>

                <div className="col fw-bold text-end">
                    {getDate(workout).time}
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
