import React from 'react'
import {UseWorkoutsContext} from '../hooks/UseWorkoutContext'
// Data Fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({workout}) => {
  
  const { dispatch } = UseWorkoutsContext();

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {    
      method: 'DELETE'
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
