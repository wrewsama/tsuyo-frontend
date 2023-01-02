import React from 'react'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import DataService from '../services/exercise'
import EditExercise from './edit-exercise'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

/**
 * A Split Button representing a single Exercise in the Exercise List.
 * 
 * Clicking the main part of the body will link to the Exercise's page. The
 * dropdown gives the option to either delete or update that Exercise.
 * 
 * @param {Object} exercise The exercise that this component represents.
 * @param {Function} updateListFunction Callback function that updates the
 *                                      list in exercises-list
 */
export default function ExerciseListItem({ exercise, updateListFunction }) {
    const { user } = useAuthContext()

    /**
     * Deletes an exercise from the database.
     * 
     * When the delete button is clicked, the id of this exercise is sent to
     * the backend as a delete request. The callback function is then called
     * to update the list in exercise-list.
     */
    const onDeleteClick = event => {
        if (!user) {
            return
        }

        // http delete request
        DataService.deleteExercise(exercise._id, user.token)
            .then(res => {
                // update the list
                updateListFunction(user.token)
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

