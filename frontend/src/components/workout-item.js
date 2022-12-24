import React from 'react'

export default function WorkoutItem({ workoutId, listOfSets }) {
    return (
        <div className="container">
            <div className="fw-bold">
                {workoutId}
            </div>
            <div className="list-group list-group-flush">
                {
                    listOfSets.map(set => {
                        return (
                            <div className="list-group-item">
                                {set.weight} kg x {set.reps} reps
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
