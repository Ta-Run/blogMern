import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {isAuth} from './isAuth'


function PostRoute
({ component:Component, ...rest }) {
  return (
    <Route 
      {...rest}
      render={ props =>
        isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/Signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

export default PostRoute

