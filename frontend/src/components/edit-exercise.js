import React, { useState, useEffect } from 'react'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import DataService from '../services/exercise'

export default function EditExercise({ exercise, updateListFunction }) {
    const [newName, setNewName] = useState(exercise.name)
    const [newDesc, setNewDesc] = useState(exercise.desc)
    const [submitted, setSubmitted] = useState(false)

    const handleNameChange = event => {
        setNewName(event.target.value)
    }

    const handleDescChange = event => {
        setNewDesc(event.target.value)
    }

    const onCancelButtonClick = event => {
        setSubmitted(false)
    }

    const onSaveButtonClick = event => {
        console.log(exercise)
        const data = {
            id: exercise._id,
            name: newName,
            desc: newDesc
        }
        DataService.updateExercise(data)
            .then(res =>{
                updateListFunction()
            })
            .catch(e => {
                console.error(e)
            })

        setSubmitted(true)
    }

    return (
        <div className="modal fade" id={`edit${exercise._id}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">Edit Exercise</div>
                    <div className="modal-body">
                        {submitted ? (
                            <div>
                                Exercise Updated!
                            </div>
                        ) : (
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="exercise-name" className="form-label">Name</label>
                                    <input type="text"
                                        id="exercise-name"
                                        className="form-control"
                                        value={newName}
                                        onChange={handleNameChange}>    
                                    </input>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exercise-desc" className="form-label">Description</label>
                                    <input type="text"
                                        id="exercise-desc"
                                        className="form-control"
                                        value={newDesc}
                                        onChange={handleDescChange}>    
                                    </input>
                                </div>
                            </form>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={onCancelButtonClick}>Close</button>

                        {submitted ? (
                            <div></div>
                        ) : (
                            <button type="button"
                                className="btn btn-primary"
                                onClick={onSaveButtonClick}>Save</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
