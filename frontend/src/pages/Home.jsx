import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext" // للحصول على المستخدم

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: {'Authorization': `Bearer ${user.token}`}, // ارسال مع الطلب الرمز المميز للمصادقة عليه
      })
      const jsonData = await response.json()

      if (response.ok) {
        dispatch({type: 'GET_WORKOUTS', payload: jsonData}) // تغيير حالة state في useContext وتخزين فيها جميع المستندات
      }
    }

    if (user) { // لا تجلب بيانات التدريبات الا ادا كان هناك مستخدم قام بتسجيل الدخول 
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">
    <div className="workouts">
      {workouts && workouts.map(workout => (
        <WorkoutDetails workout={workout} key={workout._id} />
      ))}
    </div>
    <WorkoutForm />
  </div>
  )
}

export default Home