import React,{useState} from 'react'
import {Button,Container,Form} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import DefNav from './DefNav'
import axios from 'axios'
import Toast from './Toast'
import {emailchk} from './validation'

function Forget(){

  const history = useHistory()

  const [data, setData] = useState({
    email:""
  })

  const [toast, setToast] = useState({stat:false})

  const [err,setErr] = useState({
    email:''
  })

  function toggleShow() {
    setToast({stat:false})  
  }

  function handleChange (e) {
    const {id,value} = e.target
    setData({[id]:value})
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErr('')
    var err = emailchk(data)
    if(err)
      setErr(err)
    else
    {
      const res = await axios.post('/api/forget',data)
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
  }


  return (
    <React.Fragment>
      <DefNav/>
      <Container className='mt-5 ml-2 '>
      
        <Form className='col-lg-6 offset-lg-3'>
          <Form.Group controlId="email">
            <Form.Label>Type Your Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" onChange={handleChange}/>
            <span className='ml-2' style={{color: "red"}}>{err.email}</span>
          </Form.Group>
          <Button variant="primary" type="submit" className='mt-1 mb-3 font-weight-bold' onClick={handleSubmit} >
          Submit
          </Button>
          <Form.Text className="text-muted">
      Wait few seconds before re-submitting
  </Form.Text>
        </Form>
      </Container>
      <Toast data={toast} toggleShow={toggleShow}/>
    </React.Fragment>
  )
}

export default Forget