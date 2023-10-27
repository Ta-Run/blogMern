import React from 'react'
import {Card,Col,Alert} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import axios from 'axios'



function PostCard(props){

  const history = useHistory()
  function handlepostclick(e){
    e.preventDefault()
    history.push({
      pathname: '/Showpost',
      state: { title:props.title,
               author : props.author,
                description: props.description,
              image:props.image
            }
      })
    }

  function handledelete(){
    axios.delete(`api/postdel/${props.id}`)
    .then((res)=>{
    <Alert variant='success'>
      Deleted
    </Alert>
    window.location.reload()
  })
  .catch(err=>
  <Alert variant='danger'>
    Problem
  </Alert>)
    
  }

  var str = props.description
  str = str.substring(0,70) + ' . . . . .'

  return(
  <Col lg={3} md={4} sm={12} className='mb-3' >
  <Card style={{ width: '100%' }} className='h-100'>  
  <Card.Img variant="top" src={`http://localhost:8000/uploads/${props.image}`}  />
  <Card.Body className='d-flex flex-column' bg='light'>
    <Card.Title className='mt-auto'>Title : {props.title}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted mt-auto">Author : {props.author}</Card.Subtitle>
    <Card.Text className='mt-auto'>
      {str}
    </Card.Text>
    <Button variant="primary" className='mt-auto' onClick={handlepostclick}>Read...</Button>
    {props.del ? <Button variant="danger" className='mt-2' onClick={handledelete}>Delete</Button> : null}
  </Card.Body>
  </Card>
  </Col>
  )
}

export default PostCard