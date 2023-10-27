import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'
import cookies from 'js-cookie'
import  {isAuth} from './isAuth'

function HomeNav (){ 

  function handlelogout(){
    cookies.remove('blog')
    window.location.reload()
  }
   return (
    
  
   <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
  <Navbar.Brand  >
  <img
        alt=""
        src="/logo.png"
        width="60"
        height="60"
        className="d-inline-block align-top"
    />
  </Navbar.Brand>
  <Navbar.Brand>
  The Travel Stop
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto ml-3" variant="pills" defaultActiveKey="CreatePost">
      <Nav.Link as={Link} to='/Createpost' eventKey="CreatePost">Create - Post</Nav.Link>
    </Nav>
    {isAuth() ? 
    <Nav variant="pills" defaultActiveKey="account">
       <Nav.Link as={Link} to='/Myaccount' eventKey="account" className="mr-3">My account
       </Nav.Link>
      <Nav.Link onSelect={handlelogout} eventKey="logout" className="mr-3">Log - Out</Nav.Link>
    </Nav> : null}

    {isAuth() ? null : <Nav variant="pills" defaultActiveKey="Signin" >
      <Nav.Link as={Link} to='/Signup' eventKey="Signup" className="mr-3">Sign-Up</Nav.Link>
      <Nav.Link as={Link} to='/Signin' eventKey= "Signin" className="mr-3">Sign-In</Nav.Link>
    </Nav>
     }
  </Navbar.Collapse>
</Navbar>)
}

export default HomeNav