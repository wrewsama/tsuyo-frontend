import React from 'react'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import DataService from '../services/exercise'
import EditExercise from './edit-exercise'
import { Link } from 'react-router-dom'


export default function ExerciseListItem({ exercise, updateListFunction }) {

    const onDeleteClick = event => {
        DataService.deleteExercise(exercise._id)
            .then(res => {
                updateListFunction()
            })
            .catch(e => {
                console.error(e)
            })
    }

    return (
        <div className="btn-group">
            <Link to={`/${exercise._id}`} style={{width: '100%'}}>
                <button className='btn btn-light btn-block text-start' style={{width: '100%'}}>
                    {exercise.name}
                </button>
            </Link>

            <div className="btn-group">
                <button type="button"
                        className="btn btn-light dropdown-toggle dropdown-toggle-split"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"></button>
                <ul className="dropdown-menu">
                    <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target={`#edit${exercise._id}`}>Edit</button></li>
                    <li><hr className="dropdown-divider"></hr></li>
                    <li><button className="dropdown-item" onClick={onDeleteClick}>Delete</button></li>
                </ul>
                
            </div>
            <EditExercise exercise={exercise} updateListFunction={updateListFunction} />
        </div>
    )
}

