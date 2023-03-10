import React, { useState } from 'react'
import DataService from '../services/exercise'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { useAuthContext } from '../hooks/useAuthContext'


/**
 * Modal that enables the user to add new exercises.
 * 
 * @param {Function} updateListFunction A callback function to update the list
 *                                    of exercises in exercisesList
 */
export default function AddExercise({ updateListFunction }) {
    const [newName, setNewName] = useState('')
    const [newDesc, setNewDesc] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const { user } = useAuthContext()

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
     * Adds a new exercise to the database.
     * 
     * When the user clicks the Add Button, sends a http get request to the
     * backend with the the name and desc stored inside the newName and newDesc
     * states respectively. Then, clears the inputs and sets the submitted
     * state to true.
     */
    const onAddButtonClick = event => {
        if (!user) {
            setError(true)
            return
        }

        const request = {
            name: newName,
            desc: newDesc
        }
        // send the http request to add the exercise to the database
        DataService.addExercise(request, user.token)
            .then(res => {
                updateListFunction(user.token)
            })
            .catch(e => {
                console.error(e)
            })

        // Clear inputs
        setNewName('')
        setNewDesc('')

        // Change state to submitted
        setSubmitted(true)
    }

    /**
     * Sets the submitted state to false when the Close button is clicked.
     */
    const onCloseButtonClick = event => {
        setSubmitted(false)
    }

    return (
        <div className="modal fade" id='add-exercise'>
            <div className="modal-dialog">
                <div className='modal-content'>
                    <div className='modal-header'>Add a new exercise</div>
                    <div className='modal-body'>
                        
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

                        <div>
                            {submitted && (
                                <div className="alert alert-success mt-3" role="alert">
                                    Exercise Added!
                                </div>
                            )}
                        </div>

                        <div>
                            {error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    Please log in to add exercise!
                                </div>
                            )}
                        </div>

                    </div>
                    <div className='modal-footer'>
                        <button type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={onCloseButtonClick}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={onAddButtonClick}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
