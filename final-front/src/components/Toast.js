import React from 'react'
import Toast from 'react-bootstrap/Toast'

function Toastalert(props) {
  const Show = props.data.stat
  return(
        <Toast show={Show} onClose={props.toggleShow} className='toast'>
          <Toast.Header className={props.data.class}>
            <strong className="mr-auto" bg='danger'>{props.data.head}</strong>
          </Toast.Header>
          <Toast.Body >{props.data.text}</Toast.Body> 
        </Toast>
  )
}

export default Toastalert