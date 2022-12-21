import React, { useState } from 'react'
import DataService from '../services/exercise'
import "bootstrap/dist/css/bootstrap.min.css" 

export default function AddExercise({ updateListFunction }) {

    const [newName, setNewName] = useState('')
    const [newDesc, setNewDesc] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleNameChange = event => {
        setNewName(event.target.value)
    }

    const handleDescChange = event => {
        setNewDesc(event.target.value)
    }

    const onAddButtonClick = event => {
        const request = {
            name: newName,
            desc: newDesc
        }
        // send the http request to add the exercise to the database
        DataService.addExercise(request)
            .then(res => {
                console.log(res.data)
            })
            .catch(e => {
                console.error(e)
            })

        // Clear inputs
        setNewName('')
        setNewDesc('')

        setSubmitted(true)
    }

    const onCloseButtonClick = event => {
        updateListFunction()
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
                            {submitted ? (
                                <div className="mt-3">Exercise Added!</div>
                            ) : (
                                <div></div>
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
