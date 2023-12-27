import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns ==> Link library: https://date-fns.org/ ==> install: npm i date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {  // اذا لم يكن هناك مستخدم لا تقم بارسال الطلب 
      return
    }

    const response = await fetch('https://workout-app-server-gules.vercel.app//api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const jsonData = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: jsonData})
    }
  }

    return (
      <div className="workout-details">
        <h4>{workout.title}</h4>
        <p><strong>Load (kg): </strong>{workout.load}</p>
        <p><strong>Number of reps: </strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p> {/* تعديل طريقة اظهار التاريخ بواسطة مكتبة date fns */}
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default WorkoutDetails