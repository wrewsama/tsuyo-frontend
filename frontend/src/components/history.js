import React, { useState, useEffect } from 'react'
import { useOutletContext, useParams} from 'react-router-dom'
import DataService from '../services/exercise'
import WorkoutItem from './workout-item'

export default function History() {
    const [listOfWorkoutItems, setListOfWorkoutItems] = useState([])
    const params = useParams()
    const exerciseId = params.id

    useEffect(() => {
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
    }, [])

    return (
        <div className="container">
            <ul className="list-group">
                <li className="list-group-item">
                    {listOfWorkoutItems.map(item => {
                        return (
                            <WorkoutItem key = {item[0]} workoutId={item[0]} listOfSets={item[1]} />
                        )
                    })}
                </li>
            </ul>
        </div>
    )
}
