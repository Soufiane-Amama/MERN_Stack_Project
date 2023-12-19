import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}> {/* كان بامكاننا عمل state.user للحصول على قيمة العنصر user - لكن استخدمنا ...state لنحصل على user وايضا مستقبلا اذا اضفنا عناصر اخرى داخل الكائن يمكننا الوصول لها.*/}
      { children }
    </AuthContext.Provider>
  )

}