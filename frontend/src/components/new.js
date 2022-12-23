import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import DataService from '../services/exercise'
import { v4 as uuidv4 } from 'uuid'
import NewSet from './new-set'

export default function New() {
    const exercise = useOutletContext()
    const [newSets, setNewSets] = useState([]) // {weight, reps}
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    let currIdx = 0

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
        if (!newSets.length) {
            // don't save if no new sets were added
            return
        }

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

    const deleteNewSet = idx => {
        const temp = [...newSets]
        temp.splice(idx-1, 1)
        setNewSets(temp)
    }

    const editNewSet = (idx, editedWeight, editedReps) => {
        const temp = [...newSets]
        temp[idx-1] = {
            weight: editedWeight,
            reps: editedReps
        }
        setNewSets(temp)
    }

    return (
        <div className="container">
            <div className="row px-2">
                <h5>Sets</h5>
            </div>
            <ul className="list-group mb-3">
                {
                    newSets.map(newSet => {
                        currIdx++
                        return (
                            <li key={uuidv4()} className="list-group-item">
                                <NewSet idx={currIdx}
                                        weight={newSet.weight}
                                        reps={newSet.reps}
                                        deleteFunction={deleteNewSet}
                                        editFunction={editNewSet} />
                            </li>
                        )
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
