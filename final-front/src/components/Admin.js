import React,{useState,useEffect} from 'react'
import DefNav from './DefNav'
import axios from 'axios'
import PostCard from './PostCard'
import {Row,Col,Badge} from 'react-bootstrap'
import UserCard from './UserCard'

function Admin(){
  const [pdata,setPdata] = useState([])
  const [udata,setUdata] = useState([])

  useEffect( ()=> {
    async function fetchdata(){

      const pres = await axios.get('http://localhost:8000/api/posts')
      console.log(pdata);
      const ures = await axios.get('/api/users')

    if(pres.data.err || ures.data.err || !pres || !ures)
      return alert(pres.data.err || ures.data.err || "Try Later")

    setPdata(pres.data)
    setUdata(ures.data)
    }

   fetchdata()
    },[])

  return (
    <React.Fragment>
      <DefNav/>
    <h1 style={{textAlign:'center'}}>
    <Badge className='mt-4 mb-3' pill variant="danger">ADMIN PANEL</Badge>
    </h1>
    <Row>
      <Col>
      <h1 style={{textAlign:'center'}} className='mb-4 mt-5'>
        <Badge  pill variant="primary">POSTS</Badge>
        </h1>
        <Row>
        {pdata.map(post => {
          return <PostCard title={post.title} author={post.author} image={post.image} description={post.description} key={post._id} del={true} id={post._id}/>
        })}
        </Row>
      </Col>
      <Col>
      <h1 style={{textAlign:'center'}} className='mb-4 mt-5'>
        <Badge  pill variant="primary">USERS</Badge>
      </h1>
      <Row>
      {udata.map(user => {
          return <UserCard name={`${user.name} ${user.lastname}`} email={user.email} role={user.role}  key={user._id} id={user._id}/>
        })}
      </Row>
      </Col>
    </Row>
    </React.Fragment>
  )
}

export default Admin