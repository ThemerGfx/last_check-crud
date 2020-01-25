import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../components/Dashboard';
import Liste from '../components/Liste'

class MainApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: '',
      name: '',
      number: '',
      email: ''
    }
  }
  receiveData = (data) => {
    console.log('from receiveData: ', data);
    this.setState({
      _id: data._id,
      name: data.name,
      number: data.number,
      email: data.email
    })
  }
  render () {
    console.log('this.state:', this.state)
      return (
        <div>
          <Switch>
            {/* <Route exact path = "/" component = {Dashboard} receive={this.receiveData} /> */}
            <Route exact path = "/" render = {() => <Dashboard details={this.state} receive={this.receiveData} history={this.props.history}/>} />
            <Route exact path="/liste" render = {() => <Liste receive={this.receiveData} updatedItem={this.state} />} />
          </Switch>
        </div>
    );
  }
}

export default MainApp;
