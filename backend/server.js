// Importing the express module to create an Express application.
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workout')
const userRoutes = require('./routes/user')

const cors = require('cors')

dotenv.config();

// Express app
const app = express();


app.use(cors({
    origin: 'https://workout-buddyy.vercel.app',
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true
}));

// Middleware

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// Routes 
app.get('/', (req, res) => {
    res.json({ message: "Hello from the backend!" });
})

app.use('/api/workouts/', workoutRoutes);
app.use('/api/user', userRoutes);

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for request
        app.listen(PORT, () => {
            console.log(`Server is running at: http://localhost:${PORT} and connected to DB`);
        })
    })
    .catch((error) => {
        console.log(error);
    })


// Port num
const PORT = process.env.PORT;
