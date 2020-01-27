const initState = {
  allStudents: [],
  studentItem: {}
}

const studentReducer = (state = initState, action) => {
  if (action.type === "GET_ALL_STUDENT_SUCCESS"){
    return {
      ...state,
      allStudents: action.payload
    }
  }
  if (action.type === "EDIT_STUDENT_ITEM") {
    return {
      ...state,
      studentItem: action.student
    }
  }
  return state
}

export default studentReducer;