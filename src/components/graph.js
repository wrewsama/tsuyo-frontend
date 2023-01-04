import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DataService from '../services/exercise';
import {
    Chart,
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from "react-chartjs-2"
import 'chartjs-adapter-date-fns';
import { useAuthContext } from '../hooks/useAuthContext'

// Register chart elements
Chart.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
)

/**
 * The graph component of the exercise page.
 */
export default function Graph() {
    const [listOfWorkoutItems, setListOfWorkoutItems] = useState([])
    const params = useParams()
    const exerciseId = params.id 
    const { user } = useAuthContext()

    // The dates of each workout
    const xValues = listOfWorkoutItems.map(workout => workout[0])

    // The total weight lifted in each workout
    const totalWeights = listOfWorkoutItems.map(workout => {
        const setList = workout[1]
        return setList.reduce((prev, curr) => prev + curr.weight * curr.reps, 0)
    })

    // The 1RM estimate from that workout
    const oneRepMaxes = listOfWorkoutItems.map(workout => {
        const setList = workout[1]
        return setList.reduce((prev, curr) => {
            const weight = curr.weight
            const reps = curr.reps
            const oneRm = weight / ( 1.0278 - 0.0278 * reps )
            return Math.max(prev, oneRm)
        }, 0)
    })
    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'total weight',
                data: totalWeights,
                tension: 0.4,
                borderColor: ['rgba(255,99,132,0.8)']
            },
            {
                label: '1RM',
                data: oneRepMaxes,
                tension: 0.4,
                borderColor: ['rgba(54,162,235,0.8)']
            }
        ]

    }
    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        }
    }
    /**
     * Updates the state of the listOfWorkoutItems.
     * 
     * Gets the exercise id from the url params and sends a http get request
     * with the id. Then, copies the array of Sets from the response,
     * groups them by workoutId, and updates the list of workout items.
     */
    const retrieveWorkoutItems = (token) => {
        DataService.getSetsByExerciseId(exerciseId, token)
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
                const groupedSetsArray = Object.entries(groupedSetsList)
                const newListOfWorkoutItems = []
                let itemsProcessed = 0
                groupedSetsArray.forEach(pair => {
                    const workoutId = pair[0]
                    DataService.getWorkoutById(workoutId, token)
                        .then(res => {
                            newListOfWorkoutItems.push([res.data.date, pair[1]])
                            itemsProcessed++
                            if (itemsProcessed === groupedSetsArray.length) {
                                newListOfWorkoutItems.sort((a, b) => new Date(a[0]) - new Date(b[0]))
                                setListOfWorkoutItems(newListOfWorkoutItems)
                            }
                        })
                })
                
            })
            .catch(e => {
                console.error(e)
            })
    }

    /**
     * Loads in the workout items when the page is loaded.
     */
    useEffect(() => {
        if (user) {
            retrieveWorkoutItems(user.token)
        }
    }, [user])

    return (
        <div className="container">
            <Line 
                data={data}
                options={options}
            />
        </div>
    )
}
