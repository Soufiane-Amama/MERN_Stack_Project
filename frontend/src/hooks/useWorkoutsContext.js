// الهدف من هذا الخطاف لكي يسهل علينا استخدامه في اي مكان في التطبيق وبدوره سيقوم بجلب البيانات لنا من useContext.

import { WorkoutsContext } from "../context/WorkoutsContext"
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const dataContext = useContext(WorkoutsContext)

  if(!dataContext) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return dataContext
}