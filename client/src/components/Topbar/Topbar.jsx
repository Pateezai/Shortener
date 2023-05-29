import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Container,Form,Nav,Navbar } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

const Topbar = () => {
  return (
    <Navbar  bg='light'>
      <Container >
        <Navbar.Brand href="#home">Universal</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav-user'/>
        <Navbar.Collapse id='navbar-nav-user' className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
          <Navbar.Text className='mx-2 d-none' > 
            <a href="#login" >Login</a>
          </Navbar.Text>
          <Navbar.Text className='d-none'>
            <a href="#SignUp">Sign Up</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Topbar
