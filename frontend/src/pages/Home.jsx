// import React,{useEffect, useState} from 'react'

import React, { useEffect } from 'react'

import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import { useWorkoutContext } from '../hooks/UseWorkoutContext'
import { useAuthContext } from '../hooks/UserAuthContext'

const Home = () => {

    // const [workouts, setWorkouts] = useState(null)

    const { workouts, dispatch } = useWorkoutContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            // Using template literals (backticks) makes it clean to read
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts/`,{
                headers :{
                    'Authorization': `Bearer ${user.token}` 
                }
            });
            const json = await response.json()

            if (response.ok) {
                // setWorkouts(json)

                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }

        }

        if(user){
            fetchWorkouts()
        }

    }, [dispatch, user])

    //  key = {workout._id}
    return (
        <div className='home'>
            <div className="workouts">
                {
                    workouts && workouts.map((workout) => (
                        // <p key={workout._id}>{workout.title}</p>
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))
                }
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home
