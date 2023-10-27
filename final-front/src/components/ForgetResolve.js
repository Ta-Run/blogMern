import React,{useState} from 'react'
import {Button,Container,Form} from 'react-bootstrap'
import {useParams,useHistory} from 'react-router-dom'
import DefNav from './DefNav'
import axios from 'axios'

function ForgetResolve(){
  const [data, setData] = useState({
    pwd:"",
    cpwd:""
  })

  const history = useHistory()

  const params = useParams()

  function handleChange(e){
    const { id, value } = e.target
    setData(prev => {
      return {
        ...prev,
        [id]:value
   }})}

   async function handleSubmit(e) {
    e.preventDefault()
    
    if(!(data.pwd.replace(/\s+/g, '').length>7) || !(data.cpwd.replace(/\s+/g, '').length>7))
        return alert("Password length must be 8")
    
      if(data.pwd === data.cpwd)
    {
      const res = await axios.patch(`/api/forget/resolve/${params.token}`,{pwd:data.pwd})
      if(res.data.err || !res)
        return alert(res.data.err || "try later")

      alert("Success")
      history.push('/Signin')
    }
    
  }

  return (
    <React.Fragment>
      <DefNav/>
      <Container className='mt-5 ml-2 '>
      <Form className='col-lg-6 offset-lg-3'>
        <Form.Group controlId="pwd">
          <Form.Label>Enter New Password</Form.Label>
          <Form.Control type="text" placeholder="Enter Password" onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="cpwd">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="text" placeholder="Enter Again" onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" className='mt-4 mb-3 font-weight-bold' onClick={handleSubmit} >
          Submit
          </Button>
      </Form>
      </Container>
    </React.Fragment>
  )
}

export default ForgetResolve