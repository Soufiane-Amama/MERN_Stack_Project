// الهدف من هذا الخطاف لكي يسهل علينا استخدامه في اي مكان في التطبيق وبدوره سيقوم بجلب البيانات لنا من useContext.

import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  const dataContext = useContext(AuthContext)

  if(!dataContext) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return dataContext
}