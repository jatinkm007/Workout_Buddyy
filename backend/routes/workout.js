const express = require('express');
const Workout = require('../models/workoutModel');
const { updateWorkout,deleteWorkout,getWorkout,getWorkouts,createWorkout } = require('../controllers/workoutController');
const  requireAuth  = require('../middleware/requireAuth')

const router = express.Router();


router.use(requireAuth)

/**
 * Route: /api/workouts
 * Method: GET
 * Description: Get all workouts    
 * Access: Public   
 * Parameters: None
 */

router.get('/', getWorkouts)


/**
 * Route: /api/workouts/:id
 * Method: GET
 * Description: Get a specific workout by id    
 * Access: Public   
 * Parameters: id
 */

router.get('/:id', getWorkout)


/**
 * Route: /api/workouts
 * Method: POST
 * Description: Create a new workout    
 * Access: Public   
 * Parameters: None
 */

router.post('/', createWorkout)


/**
 * Route: /api/workouts/:id
 * Method: DELETE
 * Description: Delete a specific workout by id    
 * Access: Public   
 * Parameters: id
 */

router.delete('/:id', deleteWorkout)



/**
 * Route: /api/workouts
 * Method: PATCH
 * Description: Update a workout    
 * Access: Public   
 * Parameters: id
 */

router.patch('/:id', updateWorkout)

module.exports = router;