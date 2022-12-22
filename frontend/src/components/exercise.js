import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DataService from '../services/exercise'

export default function Exercise() {
    const [exercise, setExercise] = useState({})
    const { id } = useParams()

    useEffect(() => {
        DataService.findExerciseById(id)
        .then(res => {
            console.log(res.data)
            setExercise(res.data)
        })
        .catch(e => {
            console.error(e)
        })
    }, [])

    return (
        <div>
            <div>{exercise.name}</div>
        </div>
        
    )
}
