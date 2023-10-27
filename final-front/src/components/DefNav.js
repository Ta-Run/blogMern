import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'

function DefNav(){
  return(
    <Navbar bg="dark" variant="dark" sticky="top" >
      <Navbar.Brand as={Link} to='/'>
        <img
        alt=""
        src="/logo.png"
        width="60"
        height="60"
        className="d-inline-block align-top"
        />
    </Navbar.Brand>
    <Navbar.Brand as={Link} to='/'>
    The Travel Stop
    </Navbar.Brand>

    </Navbar>
  )
}

export default DefNav