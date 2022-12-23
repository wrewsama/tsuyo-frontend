import React, { useState } from 'react'

export default function NewSet({ idx, weight, reps }) {
    const [style, setStyle] = useState({ display: 'none' })

    const handleMouseEnter = event => {
        setStyle({ display: 'block' })
    }

    const handleMouseLeave = event => {
        setStyle({ display: 'none' })
    }

    return (
        <div className="container d-flex" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="container">
                <div class='fw-bold'>Set {idx}</div>
                {weight} kg x {reps} reps
            </div>
            
            <div className="btn-group btn-group-sm">
                <button class="btn" style={style}>edit</button>
                <button class="btn" style={style}>delete</button>
            </div>
            
        </div>
    )
}
