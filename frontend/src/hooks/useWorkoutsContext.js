import { WorkoutsContext } from "../context/WorkoutsContext"
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const dataContext = useContext(WorkoutsContext)

  if(!dataContext) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return dataContext
}