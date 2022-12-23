import React from 'react'

// temporary set component
const WorkoutItem = () => {
    return <div>hi</div>
}

export default function History() {
    return (
        <div className="container">
            <ul className="list-group">
                <li className="list-group-item">
                    <WorkoutItem />
                </li>
            </ul>
        </div>
    )
}
