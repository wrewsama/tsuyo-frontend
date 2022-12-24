import React, { useState } from 'react'

/**
 * Modal to facilitate the editing of a New Set in the New page.
 * 
 * @param {Object} idx
 * @returns 
 */
export default function EditNewSet({ idx, initWeight, initReps, editFunction }) {
    const [submitted, setSubmitted] = useState(false)
    const [weight, setWeight] = useState(initWeight)
    const [reps, setReps] = useState(initReps)

    const handleWeightChange = event => {
        setWeight(event.target.value)
    }

    const handleRepChange = event => {
        setReps(event.target.value)
    }

    const onSaveButtonClick = event => {
        editFunction(idx, weight, reps)
        setSubmitted(true)
    }

    return (
        <div className="modal" id={`editset${idx}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        Edit Set
                    </div>
                    <div className="modal-body">
                        <form>
                            <label htmlFor='weight' className='form-label'>Weight</label>
                            <div className="input-group mb-3" id="weight">
                                <input type="number"
                                       className="form-control"
                                       value={weight}
                                       onChange={handleWeightChange}>
                                </input>
                                <span className="input-group-text">kg</span>
                            </div>
                        </form>

                        <form>
                            <label htmlFor='reps' className='form-label'>Reps performed</label>
                            <div className="input-group" id="reps">
                                <input type="number"
                                       className="form-control"
                                       value={reps}
                                       onChange={handleRepChange}>
                                </input>
                                <span className="input-group-text">reps</span>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal">
                            Close
                        </button>

                        <button type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={onSaveButtonClick}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
