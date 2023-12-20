import { createContext, useReducer, useEffect } from 'react'

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

  useEffect(() => { // للحفاظ على بيانات المستخدم محفوظة في واجهة المستخدم عند تحديث الصفحة البريد الالكتروني يبقى ظاهر في الرياكت..وايضا باقي البيانات السرية
    const user = JSON.parse(localStorage.getItem('user')) // دالة JSON.parse() في الجافاسكريبت تقوم بتحويل سلسلة نصية JSON إلى كائن JavaScript. وهذا يعني أنها تأخذ سلسلة نصية تمثل بيانات في تنسيق JSON وتحولها إلى كائن JavaScript يمكن استخدامه في البرنامج.

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}> {/* كان بامكاننا عمل state.user للحصول على قيمة العنصر user - لكن استخدمنا ...state لنحصل على user وايضا مستقبلا اذا اضفنا عناصر اخرى داخل الكائن يمكننا الوصول لها.*/}
      { children }
    </AuthContext.Provider>
  )

}