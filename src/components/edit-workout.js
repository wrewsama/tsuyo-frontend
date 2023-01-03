import React, { useState, useEffect } from 'react'
import DataService from '../services/exercise'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

function EditSetInWorkout({ set, deleteFunction }) {
    const [weight, setWeight] = useState(set.weight)
    const [reps, setReps] = useState(set.reps)
    const { user } = useAuthContext()

    const updateDB = () => {
        if (!user) {
            return
        }

        const data = {
            id: set._id,
            weight: weight,
            reps: reps
        }
        DataService.updateSet(data, user.token)
    }

    const handleRepChange = event => {
        setReps(event.target.value ? event.target.value : 0)
    }

    const handleWeightChange = event => {
        setWeight(event.target.value ? event.target.value : 0)
    }

    useEffect(updateDB, [weight, reps])

    const onDeleteButtonClick = event => {
        if (!user) {
            return
        }

        event.preventDefault()
        deleteFunction(set._id, user.token)
    }

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
            <button className="btn btn-outline-danger"
                    onClick={onDeleteButtonClick}>x</button>
        </div>
    )
}

export default function EditWorkout({ workoutId, initialListOfSets, updateListFunction }) {
    const [listOfSets, setListOfSets] = useState(initialListOfSets)
    const exerciseId = useParams().id
    const { user } = useAuthContext()

    const onSaveButtonClick = event => {
        if (!user) {
            return
        }
        
        updateListFunction(user.token)
    }

    const onAddButtonClick = event => {
        if (!user) {
            return
        }

        const data = {
            workoutId: workoutId,
            exerciseId: exerciseId,
            weight: 0,
            reps: 0
        }
        DataService.addSet(data, user.token)
            .then(res => {
                const newSet = res.data.set
                setListOfSets([...listOfSets, newSet])
            })
    }

    const deleteFunction = (setId, token) => {
        DataService.deleteSet(setId, token)
            .then(res => {
                const temp = listOfSets.filter(set => set._id !== setId)
                setListOfSets(temp)
            })
    }

    return (
        <div className="modal fade" id={`edit${workoutId}`}>
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
                                        <EditSetInWorkout key={set._id}
                                                          set={set}
                                                          deleteFunction={deleteFunction} />
                                    )
                                })
                            }
                        </form>
                        <button className="btn btn-outline-primary float-end"
                                onClick={onAddButtonClick}>
                            Add a new set
                        </button>
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
