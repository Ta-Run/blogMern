import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {isAuth} from './isAuth'

function ControlledRoute
({ component:Component, ...rest }) {
  return (
    <Route 
      {...rest}
      render={ props =>
        !isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default ControlledRoute

