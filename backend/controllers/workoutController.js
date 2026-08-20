const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// get all workouts 

exports.getWorkouts = async (req, res) => {

    const user_id = req.user._id

    try {
        const workouts = await Workout.find({user_id});
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// get a single workout by id

exports.getWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout found" });
    }

    const workout = await Workout.findById(id);

    if (!workout)
        return res.status(404).json({ error: "No such workout found" });

    res.status(200).json(workout);
}


// create a new workout 

exports.createWorkout = async (req, res) => {

    const { title, reps, load } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill out all the fields!', emptyFields })
    }

    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, reps, load, user_id });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// delete a workout by id

exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout found" });
    }

    const workout = await Workout.findOneAndDelete({ _id: id, user_id: req.user._id });

    if (!workout) {
        return res.status(404).json({ error: "No such workout found" });

    }

    res.status(200).json(workout);

}

// update a workout by id

exports.updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such workout found" });
    }

    const workout = await Workout.findOneAndUpdate(
        {
            _id: id
        },
        {
            ...req.body
        },
        {
            new: true
        }
    );

    if (!workout)
        return res.status(404).json({ error: "No such workout found" });

    res.status(200).json(workout)
}