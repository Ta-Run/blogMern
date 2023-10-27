import React,{useState,useEffect} from 'react'
import {isAdmin} from './isAuth'
import DefNav from './DefNav'
import Admin from './Admin'

function Adminauth(){
  const [data,setData] = useState(5)
  var a;


  useEffect( ()=> {
    (async ()=>{
      // eslint-disable-next-line react-hooks/exhaustive-deps
      a = await isAdmin()
      setData(a)
    })()
  },[])

  console.log(data)
  if(data === 1)
  return <Admin/>
  else
  return <DefNav/>
}

export default Adminauth