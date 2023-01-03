import React, { useState } from 'react'

/**
 * Modal to facilitate the editing of a New Set in the New page.
 * 
 * @param {Number} idx The index of the New Set to be edited.
 * @param {Number} initWeight The original weight in the New Set.
 * @param {Number} initReps The original number of reps in the New Set.
 * @param {Function} editFunction A callback function to update the New Set in
 *                                the New component.
 */
export default function EditNewSet({ idx, initWeight, initReps, editFunction }) {
    const [submitted, setSubmitted] = useState(false)
    const [weight, setWeight] = useState(initWeight)
    const [reps, setReps] = useState(initReps)

    /**
     * Updates the weight state when the weight input is changed by the user.
     */
    const handleWeightChange = event => {
        setWeight(event.target.value)
    }

    /**
     * Updates the reps state when the reps input is changed by the user.
     */
    const handleRepChange = event => {
        setReps(event.target.value)
    }

    /**
     * Edits the New Set.
     * 
     * When the Save Button is clicked, take the weight and reps from their
     * respective states and pass them into the editFunction. Then update
     * the submitted state to true.
     */
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
