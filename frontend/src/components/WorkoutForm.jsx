import React from 'react'
import { useState } from 'react'
import {UseWorkoutsContext} from '../hooks/UseWorkoutContext'


const WorkoutForm = () => {
  
    const {dispatch} = UseWorkoutsContext()

    const [title, SetTitle] = useState('')
    const [load, SetLoad] = useState('')
    const [reps, SetReps] = useState('')
    const [error, SetError] = useState(null)    

    const handleSubmit = async (e) => {
        e.preventDefault()  
        
        const workout = {title, load, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok) {
            SetError(json.error)
        }else{     
            SetError(null);
            SetTitle('');
            SetLoad('');    
            SetReps('');
            console.log('New workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }


  return (
    <form className='create' onSubmit= {handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => SetTitle(e.target.value)}
      />

      <label>Load (in Kg's):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => SetLoad(e.target.value)}
      />

      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => SetReps(e.target.value)}
      />

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm



