import React, { useState, useEffect } from 'react'
import DataService from '../services/exercise'

function EditSetInWorkout({ set }) {
    const [weight, setWeight] = useState(set.weight)
    const [reps, setReps] = useState(set.reps)

    const updateDB = () => {
        const data = {
            id: set._id,
            weight: weight,
            reps: reps
        }
        DataService.updateSet(data)
    }

    const handleRepChange = event => {
        setReps(event.target.value ? event.target.value : 0)
    }

    const handleWeightChange = event => {
        setWeight(event.target.value ? event.target.value : 0)
    }

    useEffect(updateDB, [weight, reps])

    return (
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
        </div>
    )
}

export default function EditWorkout({ workoutId, listOfSets, updateListFunction }) {
    const onSaveButtonClick = event => {
        updateListFunction()
    }

    return (
        <div className="modal" id={`edit${workoutId}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Workout</h5>
                        <button type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {
                                listOfSets.map(set => {
                                    return (
                                        <EditSetInWorkout key={set._id} set={set} />
                                    )
                                })
                            }
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={onSaveButtonClick}>
                            Save & Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
