import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css" 

export default function ExerciseListItem({ exercise }) {
    return (
        <div className="btn-group">
            <button className='btn btn-light btn-block text-start'>
                {exercise.name}
            </button>

            <div className="btn-group">
                <button type="button"
                        className="btn btn-light dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"></button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item">Edit</button></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><button className="dropdown-item">Delete</button></li>
                </ul>
                
            </div>
        </div>
    )
}

