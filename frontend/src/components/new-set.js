import React, { useState } from 'react'
import EditNewSet from './edit-new-set'

export default function NewSet({ idx, weight, reps, deleteFunction }) {
    const [style, setStyle] = useState({ display: 'none' })

    const handleMouseEnter = event => {
        setStyle({ display: 'block' })
    }

    const handleMouseLeave = event => {
        setStyle({ display: 'none' })
    }

    const onDeleteButtonClick = event => {
        deleteFunction(idx)
    }

    return (
        <div className="container d-flex" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="container">
                <div className='fw-bold'>Set {idx}</div>
                {weight} kg x {reps} reps
            </div>
            
            <div className="btn-group btn-group-sm">
                <button className="btn" style={style} data-bs-toggle="modal" data-bs-target={`#editset${idx}`}>edit</button>
                <button className="btn" style={style} onClick={onDeleteButtonClick}>delete</button>
            </div>
            <EditNewSet idx={idx} initWeight={weight} initReps={reps} />
        </div>
    )
}
