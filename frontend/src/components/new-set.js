import React from 'react'

export default function NewSet({ idx, weight, reps }) {
    return (
        <div>
            {idx}. {weight} kg x {reps} reps
        </div>
    )
}
