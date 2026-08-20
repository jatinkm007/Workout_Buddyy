import React from 'react'
import { useState } from 'react'
import {useWorkoutContext} from '../hooks/UseWorkoutContext'
import { useAuthContext } from '../hooks/UserAuthContext'


const WorkoutForm = () => {
  
    const {dispatch} = useWorkoutContext()
    const {user} = useAuthContext()
    const [title, SetTitle] = useState('')
    const [load, SetLoad] = useState('')
    const [reps, SetReps] = useState('')
    const [error, SetError] = useState(null)    
    const [emptyFields, SetEmptyFields] = useState([])  

    const handleSubmit = async (e) => {
        e.preventDefault()  

        if(!user){
          SetError('User must be logged in! ')
          return
        }
        
        const workout = {title, load, reps}

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts/`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
            }
        })

        const json = await response.json()

        if(!response.ok) {
            SetError(json.error)
            SetEmptyFields(json.emptyFields)
        }else{     
            SetError(null);
            SetTitle('');
            SetLoad('');    
            SetReps('');
            SetEmptyFields([]);
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
        className={emptyFields.includes('title') ? 'error' : ''}  
      />

      <label>Load (in Kg's):</label>
      <input
        type="number"
        value={load}
        onChange={(e) => SetLoad(e.target.value)}
        className={emptyFields.includes('load') ? 'error' : ''}  
      />

      <label>Reps:</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => SetReps(e.target.value)}
        className={emptyFields.includes('reps') ? 'error' : ''}   
      />

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm



