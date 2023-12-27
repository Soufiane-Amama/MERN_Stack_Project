require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


// express app 🔻
const app = express()

const PORT = process.env.PORT || 8000;


// middleware
app.use(express.json())

app.use(cors())

// app.use(cors({
//     origin: 'https://workout-theta.vercel.app',
//     credentials: true
//   }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://workout-theta.vercel.app'); // يمكنك استبدال '*' بالمواقع التي تسمح لها بالوصول
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})



// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)



// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('connected to database')

// listen for requests
app.listen(PORT, () => {
  console.log('listening for requests on port', PORT)
})

})
.catch((err) => {
  console.log(err)
}) 
