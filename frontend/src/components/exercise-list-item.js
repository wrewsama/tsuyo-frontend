import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css" 

export default function ExerciseListItem({ exercise }) {
  return (
    <div className="row">
        {exercise.name}
    </div>
  )
}

