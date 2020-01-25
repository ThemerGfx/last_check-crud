import React, { Component } from 'react';
import MainApp from '../router/main';
import { Navbar, Nav } from 'react-bootstrap'

class App extends Component {
    
 render () {
   return (
     <div>
       <Navbar bg = "light" expand = "lg">
        <Navbar.Brand href="/">Contact Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls = "basic-navbar-nav" />
        <Navbar.Collapse id = "basic-navbar-nav">
          <Nav className = "mr-auto">
            <Nav.Link href = "/">Add Contact</Nav.Link>
            <Nav.Link href = "/liste">Contact List</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <MainApp />
     </div>
   );
 }
}

export default App;