import React,{useState,useEffect} from 'react'
import DefNav from './DefNav'
import axios from 'axios'
import Toast from './Toast'
import PostCard from './PostCard'
import {Container,Row,Col,Badge} from 'react-bootstrap'
import {isAdmin} from './isAuth'

function Myaccount(){
  const [details,setDetail] = useState({posts:[]})
  const [toast, setToast] = useState({stat:false})

  function toggleShow() {
    setToast({stat:false})  
  }

  useEffect( ()=> {
    async function fetchdata(){
      const res = await axios.get('/api/account')
      console.log(res)
    if(res.data.err || !res || !res.data)
    return setToast({
      stat:true,
      head:'Error !!',
      text:res.data.err || 'Unable to Access Details',
      class:'toast-fail'
    })
    setDetail(res.data)
    }
    fetchdata()
    
    },[])
     
    const role = details.role === 1? 'Admin' : 'User'
    console.log(isAdmin())
  return (
    <React.Fragment>
      <DefNav/>
      <Container className='mt-5'>
      <Toast data={toast} toggleShow={toggleShow}/>
       <h1 style={{textAlign:'center'}}>
    <Badge className='mt-4' pill variant="primary">User Details</Badge>
    </h1>
      <Row className='mt-5' style={{textAlign:'center'}}>
      <Col >
      <h3 >Name : {details.name+' '+details.lastname}</h3>
      <h3 className='mb-4 mt-4'>Email : {details.email}</h3>
      <h3>Role : {role}</h3>
      </Col>
      </Row>
      <h1 style={{textAlign:'center'}}>
    <Badge className='mt-4' pill variant="primary">My Posts</Badge>
    </h1>
    <Container fluid className='mt-5'>
      <Row >
        {details.posts.map(post => {
          return <PostCard title={post.title} author={post.author} image={post.image} description={post.description} key={post._id} del={true} id={post._id}/>
        })}
      </Row>
    </Container>
      </Container>
    </React.Fragment>
  )
}

export default Myaccount
