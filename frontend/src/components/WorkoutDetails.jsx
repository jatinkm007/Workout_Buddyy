import React from 'react'
import {useWorkoutContext} from '../hooks/UseWorkoutContext'
// Data Fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/UserAuthContext'

const WorkoutDetails = ({workout}) => {
  
  const { dispatch } = useWorkoutContext();
  const {user} = useAuthContext()

  const handleClick = async () => {

    if(!user){
      return
    }

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts/`+ workout._id, {    
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}` 
      }
    })
    const json = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    } else {
      console.error('Failed to delete:', json.error)
    }
  }

  return (
    <div className='workout-details'>
      <h3>{workout.title}</h3>
      <p><strong>Load (in Kgs):</strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>

      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>

      <span onClick ={handleClick}>Delete</span>
      
    </div>
  )
}

export default WorkoutDetails
