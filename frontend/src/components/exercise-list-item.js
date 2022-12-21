import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css" 

export default function ExerciseListItem({ exercise }) {
    return (
        <button className='btn btn-light btn-block text-start'>
            {exercise.name}
        </button>
    )
}

