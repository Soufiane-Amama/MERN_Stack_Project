import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('https://workout-server-phi.vercel.app/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const jsonData = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(jsonData.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(jsonData))

      // update the auth context
      dispatch({type: 'LOGIN', payload: jsonData})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}