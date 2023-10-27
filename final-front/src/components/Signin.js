import React,{useState} from 'react'
import { useHistory,Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import DefNav from './DefNav'
import axios from 'axios'
import Toast from './Toast'
import {signinval} from './validation'

function Signin(){


  const [data, setData] = useState({
    email:"",
    password:""
  })

  const [toast, setToast] = useState({stat:false})
  const [err,setErr] = useState({
    email:'',
    password:''
  })

  const history = useHistory()

  function toggleShow() {
    setToast({stat:false})
  }

  async function signinpost()
  {

    const res = await axios.post('http://localhost:8000/api/signin',data)
    if(res.data.err || !res)
        return setToast({
          stat:true,
          head:'Error !!',
          text:res.data.err || 'Try Again after some Time',
          class:'toast-fail'
        })
      setToast({
        stat:true,
        head:'Success !!',
        text:res.data,
        class:'toast-success'
      })

      const timer = setTimeout(() => {
        toggleShow()
        history.push('/')
      }, 1500)
      return () => clearTimeout(timer)
  }

  function handleChange(e){
    const { id, value } = e.target
    setData(prev => {
      return {
        ...prev,
        [id]:value
   }})}

   function handleSubmit(e){
    e.preventDefault()
    setErr('')
    var res = signinval(data)
    if(res)
      setErr(res)
    else
    signinpost()
   }

  return (
<React.Fragment>
<DefNav/>
<Container className='mt-5 ml-2 '>

<Form className='col-lg-6 offset-lg-3'>
  <Form.Group controlId="email">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter Email" onChange={handleChange} />
    <span className='ml-2' style={{color: "red"}}>{err.email}</span>
  </Form.Group>
  <Form.Group controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={handleChange}/>
    <span className='ml-2' style={{color: "red"}}>{err.password}</span>
  </Form.Group>
  <Form.Text as={Link} to='/Signup' > New User ? Get Started</Form.Text>
  <Form.Text as={Link} to='/Forget' className='mt-2 text-muted'>Forget password ?</Form.Text>
  <Button variant="primary" type="submit" className='mt-4 mb-3 font-weight-bold' onClick={handleSubmit}>
    Sign-In
  </Button>
  <Form.Text className="text-muted">
      We'll never share your details with anyone else.
  </Form.Text>
</Form>
</Container>
<Toast data={toast} toggleShow={toggleShow}/>
</React.Fragment>
  )
}

export default Signin