import React from 'react'
import {Card,Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function UserCard(props) {

  function handledelete(){
    if(props.role === 1)
    return alert('Not Allowed deleting Admin')
    axios.delete(`api/userdel/${props.id}`)
    .then((res)=>{alert('delete')
    window.location.reload()
  })
  .catch(err=>alert('problem'))
  }

  return (
    <Col lg={3} md={4} sm={12} className='mb-3' >
    <Card style={{ width: '100%' }} className='h-100'>  
    <Card.Body className='d-flex flex-column' bg='light'>
    <Card.Title className='mt-auto'>Name : {props.name}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted  mt-auto">Email : {props.email}</Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted  mt-auto">Role : {props.role}</Card.Subtitle>
    <Button variant="danger" className='mt-2' onClick={handledelete}>Delete</Button>
  </Card.Body>
  </Card>
  </Col>
  )
}

export default UserCard