import React from 'react'
import { Container,Badge } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import DefNav from './DefNav'


function Showpost() {
  const location = useLocation()
  return (
    <React.Fragment>
      <DefNav/>
      <Container fluid className='mb-5'>
      <img className='image' src={`http://localhost:8000/uploads/${location.state.image}`}/>
      <h1 className='mt-4 mb-4' style={{textAlign:'center'}}><Badge style={{padding:'12px 35%'}} className='mt-4' pill variant="primary">{location.state.title}</Badge></h1>
      <h5 className='' style={{textAlign:'center'}}>By : {location.state.author}</h5>
      <h5 className='mt-5 mr-3 ml-3'>{location.state.description}</h5>
      </Container>
    </React.Fragment>

  )
}

export default Showpost
