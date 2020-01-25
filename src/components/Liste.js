import React from 'react';
import { Card, Button } from 'react-bootstrap'
import axios from 'axios';

class Liste extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name : "",
      number : "",
      email : "",
      contactsTab : []
    }
  }

  componentDidMount() {
    fetch("http://localhost:5000/liste")
      .then(res => res.json())
      .then(data => this.setState({ contactsTab: data }));
  }

  deleteData = (item, e) => {
    console.log(this.state)
    console.log(item)
    axios.delete('http://localhost:5000/delete/' + item._id, item )
      .then((res) => {
        console.log('res: ', res)
        if(res.status === 200) {
          this.setState((prevState) => {
            return {
              ...prevState,
              contactsTab: prevState.contactsTab.filter((contact) => contact._id !== item._id)
            }
          })
        }
      })
      .catch(function (error) {
        console.log('error: ', error)
      })
  }

  updateData = (item) => {
    console.log('itemitem: ', item)
    const myData = {
      name : item.name,
      number : item.number,
      email : item.email,
      _id: item._id
    };
    this.props.receive(myData);
  }

  render () {
    // console.log('this.props.updatedItem: ', this.props.updatedItem)
    console.log('from Liste ', this.props);
    const contactsFetched = this.state.contactsTab.map((element) => {
      if (element._id === this.props.updatedItem._id && this.props.updated === true) {
        return(this.props.updatedItem);
      } else {
        return element;
      }
    }).map((contact, index) => {
      return ( 
        <div className = "d-inline-flex p-2 bd-highlight"  key = { index }>
          <Card style = {{ width: '30rem' }}>
            <Card.Body>
              <Card.Title>Contact Details</Card.Title>
              <Card.Text>
                Contact Name : { contact.name }
              </Card.Text>
              <Card.Text>
                Contact Number : { contact.number }
              </Card.Text>
              <Card.Text>
                Contact Email : { contact.email }
              </Card.Text>
              <Button onClick = { () => this.updateData(contact) }> Edit </Button>
              <Button variant = 'secondary' onClick = { () => this.deleteData(contact) }> Delete </Button>
            </Card.Body>
          </Card>
        </div>
      )
    })
    return (
      <div>
        { contactsFetched }  
      </div>
    );
  }
}

export default Liste;
