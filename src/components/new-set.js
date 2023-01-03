import React, { useState } from 'react'
import EditNewSet from './edit-new-set'

/**
 * Container for the information and functionality for a given New Set.
 * 
 * @param {Number} idx The index number of this New Set.
 * @param {Number} weight The weight used for this New Set.
 * @param {Number} reps The number of reps performed in this New Set.
 * @param {Function} deleteFunction A callback function to delete this New Set
 *                                  from the list in the New page
 * @param {Function} editFunction A callback function to edit this New Set
 *                                and update the list in the New page
 */
export default function NewSet({ idx, weight, reps, deleteFunction, editFunction }) {
    const [style, setStyle] = useState({ display: 'none' })

    /**
     * Makes certain divs visible when the mouse enters an area.
     */
    const handleMouseEnter = event => {
        setStyle({ display: 'block' })
    }

    /**
     * Makes certain divs disappear when the mouse leaves an area.
     */
    const handleMouseLeave = event => {
        setStyle({ display: 'none' })
    }

    /**
     * Deletes this New Set when the delete button is clicked.
     */
    const onDeleteButtonClick = event => {
        deleteFunction(idx)
    }

    return (
        <div className="container d-flex"
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}>
            <div className="container">
                <div className='fw-bold'>Set {idx}</div>
                {weight} kg x {reps} reps
            </div>
            
            <div className="btn-group btn-group-sm">
                <button className="btn"
                        style={style}
                        data-bs-toggle="modal"
                        data-bs-target={`#editset${idx}`}>
                    edit
                </button>
                <button className="btn"
                        style={style}
                        onClick={onDeleteButtonClick}>
                    delete
                </button>
            </div>
            <EditNewSet idx={idx}
                        initWeight={weight}
                        initReps={reps}
                        editFunction={editFunction} />
        </div>
    )
}
