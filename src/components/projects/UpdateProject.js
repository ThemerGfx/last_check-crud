import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { connect } from 'mongodb';

//components
import ProjectListToUpdate from './ProjectListToUpdate';
import { Link } from 'react-router-dom';

import { updateStudent } from '../../store/actions/studentActions'

class UpdateProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      email: '',
      phone: '',
      cash: '',
      level: '',
      time: '',
      allStudents: []
    };
 }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  getAll = () => {
    fetch("http://localhost:5000/getall")
    .then((res) => res.json())
    .then((data) => {
      this.setState({ 
        _id: '',
        name: '',
        email: '',
        phone: '',
        cash: '',
        level: '',
        time: '',
        updatedClicked: false,
        allStudents: [...data]
      },
      () => {console.log(this.state.allStudents)}
      )
    })
  }

  updateStudent = (e, item) => {
    e.preventDefault()
    this.props.updateStudent(item)
  }

  cancelUpdate = () => {
    this.setState({
      _id: '',
      name: '',
      email: '',
      phone: '',
      cash: '',
      level: '',
      time: ''
    })
  }

  receiveData = (data) => {
    this.setState({
      ...data
    })
  }


  render() {
    return (
      <div className = "container">
        <form className = "white"  component={Paper}>
          <h5 className = "grey-text text-darken-3"> Update a Student </h5>
          <div className = "input-field">
            {/* <label htmlFor = "name" > Student Name </label> */}
              <input 
                type = "text" 
                id = "name"
                value = { this.state.name } 
                onChange = { this.handleChange } 
              />
          </div>
          <div className = "input-field" >
            <input 
              type = "email"
              id = "email" 
              value = { this.state.email }
              onChange = { this.handleChange }
            />
            {/* <label htmlFor = "email" > Student Email </label> */}
          </div>
          <div className = "input-field" >
            <input 
              type = "number"
              id = "phone" 
              value = { this.state.phone } 
              onChange = { this.handleChange }
            />
            {/* <label htmlFor = "phone" > Student Phone </label> */}
          </div>
          <div className = "input-field" >
            <input 
              type = "number"
              id = "cash" 
              value = { this.state.cash } 
              onChange = { this.handleChange }
            />
            {/* <label htmlFor = "cash" > Cash DTN </label> */}
          </div>
          <div className = "input-field" >
            <input 
              type = "text"
              id = "level"  
              value = { this.state.level }
              onChange = { this.handleChange }
            />
            {/* <label htmlFor = "finished" > Student Situation </label> */}
          </div>
          <div className = "input-field" >
            <input 
              type = "text"
              id = "time"  
              value = { this.state.time }
              onChange = { this.handleChange }
            />
            {/* <label htmlFor = "finished" > Student Situation </label> */}
          </div>
          <div className = "input-field">
            <button 
              className = "btn blue lighten-1" 
              onClick = { this.updateStudent }
              component = {Link} to = "/"
            >              
              Update
            </button>
            <button 
              className = "btn grey lighten-3" 
              onClick = { this.cancelUpdate }
              component = {Link} to = "/update"
            >              
              Cancel
            </button>
          </div>
        </form>
        <div className = "col s12 m6">
            <ProjectListToUpdate 
              receive = { this.receiveData }
              updatedItem = {{
                _id: this.state._id,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                cash: this.state.cash,
                level: this.state.level,
                time: this.state.time,
              }}
            />
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allStudents: state.studentReducer.allStudents,
    studentItem: state.studentReducer.studentItem
  }
}

export default connect(mapStateToProps, { updateStudent })(UpdateProject)