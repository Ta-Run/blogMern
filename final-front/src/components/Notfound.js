import React,{useEffect} from 'react'
import {useHistory} from 'react-router-dom'

function Notfound(){
  const history = useHistory()
  useEffect(() => {
    const timer = setTimeout(() => {
      history.push('/')
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  return(
    <div className='notfound'>
      <h1>404 NOT FOUND</h1>
      <h3 className='mt-2 mb-4'>Can't find What You Looking For</h3>
      <h4>You will be Redirected</h4>
    </div>
  )
}

export default Notfound