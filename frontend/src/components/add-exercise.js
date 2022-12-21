import React from 'react'

export default function AddExercise() {
  return (
    <div className="modal fade" id='add-exercise'>
        <div className="modal-dialog">
            <div className='modal-content'>
                <div className='modal-header'>Add a new exercise</div>
                <div className='modal-body'>
                    body
                </div>
                <div className='modal-footer'>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary">Add</button>
                </div>
            </div>
        </div>
    </div>
  )
}
