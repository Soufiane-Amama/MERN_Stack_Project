import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) { // اذا لم يكن هناك مستخدم لا تقم بارسال الطلب حتى يقوم بتسجيل الدخول والمصادقة
      setError('You must be logged in')
      return
    }

    const workout = {title, load, reps}
    
    const response = await fetch('https://workout-app-server-gules.vercel.app/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const jsonData = await response.json()

    if (!response.ok) {
      setError(jsonData.error)
      setEmptyFields(jsonData.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setEmptyFields([])
      setTitle('')
      setLoad('')
      setReps('')
      dispatch({type: 'CREATE_WORKOUT', payload: jsonData})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label htmlFor='title'>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        id='title'
        className={emptyFields.includes('title') ? 'error' : ''} // دالة includes تقوم بالبحث داخل المصفوفة عن العنصر المحدد داخلها
      />

      <label htmlFor='load'>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        id='load'
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label htmlFor='reps'>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        id='reps'
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm