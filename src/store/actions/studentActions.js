import axios from 'axios'

let allStudents = []

export const createStudent = (student) => { 
  return (dispatch) => { 
      axios.post('http://localhost:5000/addone', student)
        .then((res) => {
          if (res.status === 2000) {
            this.setState((prevState) => {
              return {
                ...prevState,
                allStudents: [...prevState.allStudents, {...this.state}]
              }
            })
          }
          console.log(student)
        })
        .then(() => {
          dispatch({
            type: "add_student"
          })
        })
        .catch((err) => console.log('error from add: ', err))
    }
}

export const removeStudent = (item) => {
  return (dispatch) => {
    axios.delete('http://localhost:5000/deleteone/' + item._id, item)
    .then((res) => {
        if(res.status === 200) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    allStudents: prevState.allStudents.filter((student) => student._id !== item._id)
                }
            })
        }
    })
    .catch((err) => console.log('error from delete: ',err))
  }
}

export const selectStudent = (student) => {
  return {
    type: "EDIT_STUDENT_ITEM",
    student
  }
}

export const updateStudent = (student) => {
  return (dispatch) => {
    axios.put(`http://localhost:5000/modifyone/${student._id}`, { ...student })
    .then(() => {
      dispatch({
        type: "UPDATE_STUDENT"
      })
    })
    .catch((err) => console.log(err))
  }
}

export const getAllStudents = () => {
  return (dispatch) => {
    fetch("http://localhost:5000/getall")
    .then((res) => 
      res.json()
    )
    .then((data) => 
      this.setState({ allStudents: data })
    )
    .then(() => {
      dispatch(getAllStudentsSuccess(allStudents))
      return allStudents
    })
    .catch((err) => console.log("error adding student: ", err))
  }
}

export const getAllStudentsSuccess = (allStudents) => (
  {
    type:'GET_ALL_STUDENTS_SUCCESS',
    payload: allStudents
  }
)
