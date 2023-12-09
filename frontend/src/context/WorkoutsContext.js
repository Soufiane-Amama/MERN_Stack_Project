import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()


export const workoutsReducer = (state, action) => { // دالة workoutsReducer تأخذ 2 باراميترز 
  //  الاول state وهي القيمة الاولية للحالة قبل اجراء تغيير عليه
  // والثاني action وهو نوع الاجراء الذي يتم ارساله من dispatch وبناء عليه يتم تحديث قيمة state.
  switch (action.type) {
    case 'GET_WORKOUTS':
      return { 
        workouts: action.payload // سيجلب جميع المستندات ويخزنها في workouts
      }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts]  // وضعناه داخل مصفوفة لان الاضافة ستكون مستند فردي يتم اضافتها مع المستندات داخل المصفوفة
        //وهو المستند الجديد action.payload
        // وضعنا ...state.workouts وهي المستندات السابقة لاضافة عليها الجديدة.
      }
    default:
      return state
  }
}


export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null }) 
  // - الكائن { workouts: null } سيكون القيمة الاولية لـ state .
  // -  دالة workoutsReducer  يتم بناء فيها منطق شرطي لتغيير قيمة state بناء على تحقق الشرط.
  // - ودالة dispatch  تقوم بإرسال الإجراءات (Actions) إلى المُحدِّث workoutsReducer لتغيير الحالة.
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}> {/* وضعنا ثلاثة نقاط كالتالي ...state لكي اشارك خاصية workouts الفعلية التي هي داخل الكائن state */}
      { children }
    </WorkoutsContext.Provider>
  )
}
