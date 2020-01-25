import React from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom'

import Liste from './Liste';

class Dashboard extends React.Component {

  state = {
    _id: "",
    name: "",
    number: "",
    email: "",
    contactsTab: [],
    updateClicked: false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  sendData = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/add', { ...this.state })
      .then((res) => {
        console.log('before if: ',res)
        if (res.status === 200) {
          console.log('before map: ',this.state)
          this.setState((prevState) => {
            return {
              ...prevState,
              contactsTab: [...prevState.contactsTab, {...this.state}]
            }
          })
          this.props.history.push('/liste')
          console.log('after map', this.state)
        }
    })
    .catch( (err) => console.log('error: ', err) )
  }

  updateContact = (event, item) => {
    event.preventDefault()
    console.log('item: ', item)
    axios.put(`http://localhost:5000/update/` + item._id, {...this.state})
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.setState({updateClicked: true})
          // console.log('inside Dash', this.props)
          // this.setState(() => {
          //   return {
          //     ...this.state,
          //     contactsTab: [...this.state.contactsTab, item]
          //   }
          // })
        }
      })
      .catch((err) => console.log(err))
  }

  receiveData = (data) => {
    this.setState({
      ...data
    })
  }

  render() {
    console.log('this.props:: ', this.props)
    return (
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Contact Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              value = {this.state.name}
              onChange = {this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              id="number"
              type="number"
              value = {this.state.number}
              onChange = {this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contact Email</Form.Label>
            <Form.Control
              id="email"
              type="email"
              value = {this.state.email}
              onChange = {this.handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick = {this.sendData}
            type="button"
            component = {Link} to = {'/liste'}
          >
            Add
          </Button>
          <Button
            variant="secondary"
            onClick={(event) => this.updateContact(event, this.state)}
            type="submit"
          >
            Update
          </Button>
        </Form>
        <div>
          <Liste 
            receive={this.receiveData} 
            updatedItem={{
                _id: this.state._id,
                name: this.state.name,
                number: this.state.number,
                email: this.state.email,
               }} 
            updated={this.state.updateClicked} 
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);