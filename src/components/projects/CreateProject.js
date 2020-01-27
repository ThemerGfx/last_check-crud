import React, { Component } from 'react'
import {connect} from 'react-redux';

import { createStudent } from '../../store/actions/studentActions'

class CreateProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: '',
      name: '',
      email: '',
      phone: '',
      cash: '',
      level: '',
      time: ''
    }
}

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, phone, cash, level, time} = this.state
    if(name !== null && email !== null && phone !== null && cash !== null && level !== null && time !== null) {
      this.props.dispatch(createStudent(this.state))
      this.setState({
        _id: '',
        name: '',
        email: '',
        phone: '',
        cash: '',
        level: '',
        time: '',
      })
      console.log('yess')
    }
  }

  render() {

    return (
      <div className  ="container">
        <form className = "white">
          <h5 className = "grey-text text-darken-3"> Create a Student </h5>
          <div className = "input-field">
            <input 
              type = "text" 
              id = "name" 
              onChange = { this.handleChange } 
            />
            <label htmlFor = "name" > Student Name </label>
          </div>
          <div className = "input-field" >
            <input 
              type = "email"
              id = "email" 
              onChange = { this.handleChange }
            />
            <label htmlFor = "email" > Student Email </label>
          </div>
          <div className = "input-field" >
            <input 
              type = "number"
              id = "phone"  
              onChange = { this.handleChange }
            />
            <label htmlFor = "phone" > Student Phone </label>
          </div>
          <div className = "input-field" >
            <input 
              type = "number"
              id = "cash" 
              onChange = { this.handleChange }
            />
            <label htmlFor = "cash" > Cash DTN </label>
          </div>
          <div className = "input-field" >
            <input 
              type = "text"
              id = "level" 
              onChange = { this.handleChange }
            />
            <label htmlFor = "finished" > Student's Level </label>
          </div>
          <div className = "input-field" >
            <input 
              type = "text"
              id = "time" 
              onChange = { this.handleChange }
            />
            <label htmlFor = "finished" > Student's Time </label>
          </div>
          <div className = "input-field">
            <button 
              className = "btn green lighten-1" 
              onClick = {() => {
                this.handleSubmit()
                this.showAlert()
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    allStudents: state.studentReducer.allStudents,
    studentItem: state.studentReducer.studentItem
  }
}

export default connect(mapStateToProps, { createStudent })(CreateProject)