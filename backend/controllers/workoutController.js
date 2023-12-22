const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id

  const workouts = await Workout.find({user_id}).sort({createdAt: -1}) // سيجلب جميع التدريبات التي تنتمي الى معرف المستخدم الحالي المسجل دخوله في الموقع ثم قمنا بفرزها وترتيبها على حسب تاريخ الانشاء لتظهر الاحدث في اعلى الصفحة

  res.status(200).json(workouts)
}


// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) { // نقوم بالتحقق اذا كان id صالح ام لا ويتبع الشروط والمعايير
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id) // للبحث عن المستند وجلبه عن طريق id الخاص به.

  if (!workout) { // بما ان id يتبع الشروط سنتحقق اذا تم جلبه من قاعدة البيانات عن طريق id ام لا يوجد هذا المستند بهذا المعرف.
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}


// create a new workout
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body

  let emptyFields = [] // مصفوفة لتخزين الحقول الفارغة التي تم ارسالها مع الطلب 

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
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const user_id = req.user._id

    const workout = await Workout.create({ title, load, reps, user_id })  // انشاء مستند من النموذج
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndDelete({_id: id})
  
    if(!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
  }


// update a workout
  const updateWorkout = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndUpdate({_id: id}, { ...req.body }) 
  
    if (!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
  }


module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}