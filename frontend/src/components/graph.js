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

Chart.register(
    LineElement,
    TimeScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
)
export default function Graph() {
    const [listOfWorkoutItems, setListOfWorkoutItems] = useState([])
    const params = useParams()
    const exerciseId = params.id 

    const xValues = listOfWorkoutItems.map(workout => workout[0])
    const totalWeights = listOfWorkoutItems.map(workout => {
        const setList = workout[1]
        return setList.reduce((prev, curr) => prev + curr.weight, 0)
    })

    const data = {
        labels: xValues,
        datasets: [{
            label: 'total weight',
            data: totalWeights,
            tension: 0.4,
            borderColor: ['rgba(255,99,132,0.2)']
        }]

    }
    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second'
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
                const groupedSetsArray = Object.entries(groupedSetsList)
                const newListOfWorkoutItems = []
                let itemsProcessed = 0
                groupedSetsArray.forEach(pair => {
                    const workoutId = pair[0]
                    DataService.getWorkoutById(workoutId)
                        .then(res => {
                            newListOfWorkoutItems.push([res.data.date, pair[1]])
                            itemsProcessed++
                            if (itemsProcessed === groupedSetsArray.length) {
                                setListOfWorkoutItems(newListOfWorkoutItems)
                            }
                        })
                })
                
            })
            .catch(e => {
                console.error(e)
            })
    }

    useEffect(retrieveWorkoutItems, [])

    return (
        <div className="container">
            <Line 
                data={data}
                options={options}
            />
        </div>
    )
}
