import React from 'react'

export default function NewSet({ idx, weight, reps }) {
    return (
        <div className="container d-flex">
            <div className="container">
                <div class='fw-bold'>Set {idx}</div>
                {weight} kg x {reps} reps
            </div>
            <div className="dropdown my-auto float-end">
                <button className="btn dropdown-toggle" data-bs-toggle="dropdown"></button>
                <ul className="dropdown-menu">
                    <li>
                        <button className="dropdown-item">
                            Edit
                        </button>
                        <li><hr class="dropdown-divider"></hr></li>
                        <button className="dropdown-item">
                            Delete
                        </button>
                    </li>
                </ul>
            </div>
            
        </div>
    )
}
