import React,{useEffect, useState} from 'react'
import HomeNav from './HomeNav'
import {Badge,Container,Row} from 'react-bootstrap'
import axios from 'axios'
import PostCard from './PostCard'

function Home(){

  const [posts,setPosts] = useState([])

  useEffect(()=> {
    async function fetchdata() {
      try{
    const res = await axios.get('http://localhost:8000/api/posts')
    setPosts(res.data)
    } catch(err){
      alert("something went wrong")
    }}
    fetchdata()
    },[])
  return(
  <React.Fragment>
    <HomeNav/>
    <h1 style={{textAlign:'center'}}>
    <Badge className='mt-4' pill variant="danger">POSTS</Badge>
    </h1>
    <Container fluid className='mt-5'>
      <Row >
        {posts.map(post => {
          return <PostCard title={post.title} author={post.author} image={post.image} description={post.description} key={post._id} />
        })}
      </Row>
    </Container>
    </React.Fragment>

  )
}

export default Home