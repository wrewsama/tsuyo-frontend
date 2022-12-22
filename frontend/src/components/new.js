import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import DataService from '../services/exercise'
import { v4 as uuidv4 } from 'uuid'

export default function New() {
    const exercise = useOutletContext()
    const [newSets, setNewSets] = useState([]) // {weight, reps}
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')

    const handleWeightChange = event => {
        setWeight(event.target.value)
    }

    const handleRepChange = event => {
        setReps(event.target.value)
    }

    const onAddButtonClick = event => {
        setNewSets([...newSets, { weight: weight ? weight : 0, reps: reps ? reps : 0}])
    }

    const onClearButtonClick = event => {
        setNewSets([])
        setWeight('')
        setReps('')
    }

    const onSaveButtonClick = event => {
        DataService.addWorkout({})
            .then(res => {
                const workoutId = res.data.id
                const exerciseId = exercise._id

                let itemsProcessed = 0
                newSets.forEach(set => {
                    const data = {
                        workoutId: workoutId,
                        exerciseId: exerciseId,
                        weight: set.weight,
                        reps: set.reps
                    }
                    DataService.addSet(data)
                    itemsProcessed++
                    if (itemsProcessed === newSets.length) {
                        onClearButtonClick()
                    }
                })
            })
            .catch(e => {
                console.error(e)
            })
    }

    return (
        <div className="container">
            <div className="row px-2">
                <h5>Sets</h5>
            </div>
            <ul className="list-group list-group-numbered mb-3">
                {
                    newSets.map(newSet => {
                        return <li key={uuidv4()} className="list-group-item">{newSet.weight} {newSet.reps}</li>
                    })
                }
            </ul>
            <div className="input-group mb-3">
                <input type="number"
                       className="form-control"
                       placeholder="weight"
                       onChange={handleWeightChange}
                       value={weight} />
                <div className="input-group-text">kg</div>
                <input type="number"
                       className="form-control"
                       placeholder="reps performed"
                       onChange={handleRepChange}
                       value={reps} />
                <div className="input-group-text">reps</div>
                <button className="btn btn-outline-primary" onClick={onAddButtonClick}>+</button>
            </div>
            
            <button className="btn btn-primary btn-sm float-end m-1" onClick={onSaveButtonClick}>Save</button>
            <button className="btn btn-secondary btn-sm float-end m-1" onClick={onClearButtonClick}>Clear</button>
            
        </div>
    )
}
