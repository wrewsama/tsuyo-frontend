import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import DataService from '../services/exercise'
import { v4 as uuidv4 } from 'uuid'
import NewSet from './new-set'

/**
 * A container to facilitate the addition of new sets for an Exercise.
 */
export default function New() {
    const exercise = useOutletContext()
    const [newSets, setNewSets] = useState([]) // {weight, reps}
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    let currIdx = 0

    /**
     * Updates the weight state when the weight input is updated.
     */
    const handleWeightChange = event => {
        setWeight(event.target.value)
    }

    /**
     * Updates the reps state when the reps input is updated.
     */
    const handleRepChange = event => {
        setReps(event.target.value)
    }

    /**
     * Updates the list of new sets with a new set when the Add button is
     * clicked.
     */
    const onAddButtonClick = event => {
        setNewSets([...newSets, { weight: weight ? weight : 0, reps: reps ? reps : 0}])
    }

    /**
     * Resets all states when the Clear button is clicked.
     */
    const onClearButtonClick = event => {
        setNewSets([])
        setWeight('')
        setReps('')
    }

    /**
     * Add a workout and corresponding sets to the database.
     */
    const onSaveButtonClick = event => {
        if (!newSets.length) {
            // don't save if no new sets were added
            return
        }

        // Add a workout to the database
        DataService.addWorkout({})
            .then(res => {
                // get the id of the recently created workout
                const workoutId = res.data.id 
                // get the id of this exercise
                const exerciseId = exercise._id

                // add all the sets to the database
                let itemsProcessed = 0
                newSets.forEach(set => {
                    const data = {
                        workoutId: workoutId,
                        exerciseId: exerciseId,
                        weight: set.weight,
                        reps: set.reps
                    }
                    // Add this set to the database
                    DataService.addSet(data)
                    itemsProcessed++
                    if (itemsProcessed === newSets.length) {
                        // If all the sets have been added, clear.
                        onClearButtonClick()
                    }
                })
            })
            .catch(e => {
                console.error(e)
            })
    }

    /**
     * Deletes a set from the list of New Sets.
     */
    const deleteNewSet = idx => {
        const temp = [...newSets]
        temp.splice(idx-1, 1)
        setNewSets(temp)
    }

    /**
     * Edits a New Set.
     * 
     * @param {Number} idx The index number of the set to edit.
     * @param {Number} editedWeight The new weight of the set.
     * @param {Number} editedReps The new number of reps of the set.
     */
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
