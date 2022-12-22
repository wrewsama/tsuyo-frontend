import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

export default function New() {
    const exercise = useOutletContext()
    const [newSets, setNewSets] = useState([]) // {weight, reps}
    const [weight, setWeight] = useState(0)
    const [reps, setReps] = useState(0)

    const handleWeightChange = event => {
        setWeight(event.target.value)
    }

    const handleRepChange = event => {
        setReps(event.target.value)
    }

    const onAddButtonClick = event => {
        setNewSets([...newSets, { weight: weight, reps: reps }])
    }

    return (
        <div className="container">
            <div className="row px-2">
                <h5>Sets</h5>
            </div>
            <ul class="list-group mb-3">
                {
                    newSets.map(newSet => {
                        return <li class="list-group-item">{newSet.weight} {newSet.reps}</li>
                    })
                }
            </ul>
            <div className="input-group mb-3">
                <input type="number" class="form-control" placeholder="weight" onChange={handleWeightChange} />
                <div class="input-group-text">kg</div>
                <input type="number" class="form-control" placeholder="reps performed" onChange={handleRepChange} />
                <div class="input-group-text">reps</div>
                <button class="btn btn-outline-primary" onClick={onAddButtonClick}>+</button>
            </div>
            
            <button class="btn btn-primary btn-sm float-end m-1">Save</button>
            <button class="btn btn-secondary btn-sm float-end m-1">Cancel</button>
            
        </div>
    )
}
