import React, { useState, useEffect } from 'react'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import DataService from '../services/exercise'

/**
 * Modal to facilitate the editing of an Exercise.
 * 
 * @param {Object} exercise The exercise to edit.
 * @param {Object} updateListFunction A callback function to update the list
 *                                    in exercises-list
 */
export default function EditExercise({ exercise, updateListFunction }) {
    const [newName, setNewName] = useState(exercise.name)
    const [newDesc, setNewDesc] = useState(exercise.desc)
    const [submitted, setSubmitted] = useState(false)

    /**
     * Updates the newName state when the name input is changed by the user.
     */
    const handleNameChange = event => {
        setNewName(event.target.value)
    }

    /**
     * Updates the newDesc state when the desc input is changed by the user.
     */
    const handleDescChange = event => {
        setNewDesc(event.target.value)
    }

    /**
     * Sets the submitted state to false when the Cancel button is clicked.
     */
    const onCancelButtonClick = event => {
        setSubmitted(false)
    }

    /**
     * Updates an exercise in the database.
     * 
     * When the save button is clicked, take the id from the exercise field,
     * along with the name and desc from the newName and newDesc states
     * respectively. This data is then sent to the backend to update the
     * exercise in the database.
     */
    const onSaveButtonClick = event => {
        const data = {
            id: exercise._id,
            name: newName,
            desc: newDesc
        }

        // http put request
        DataService.updateExercise(data)
            .then(res =>{
                updateListFunction()
            })
            .catch(e => {
                console.error(e)
            })

        // set submitted state
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
