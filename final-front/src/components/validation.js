var err

function email(data){
  if(!data.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/))
  err ={
    ...err,
    email:'Email is Invalid'
  }
}

function textonly(data,field){
  if(!(data.replace(/\s+/g, '').length>2))
   return err ={
    ...err,
    [field]:'Minimum length must Be 3'
  }
  if(!(data.match(/^[a-zA-Z]+$/)) )
  err ={
    ...err,
    [field]:'Please enter letters Only'
  }
}

function password(data){
  if(!(data.replace(/\s+/g, '').length>7))
  err ={
    ...err,
    password:'Minimum length must Be 8'
  }
}

function desc(data){
  if(!(data.replace(/\s+/g, '').length>199))
  err ={
    ...err,
    description:'Minimum length 200 chars'
  }
}

function signinval(data) {
  err = null
  email(data.email)
  password(data.password)
  return err
}

function signupval(data) {
  err = null
  textonly(data.name,'name')
  email(data.email)
  password(data.password)
  return err
}

function postval(data) {
  err = null
  textonly(data.title,'title')
  textonly(data.author,'author')
  desc(data.description)
  if(!data.image)
  err ={
    ...err,
    image:'Please Select a image'
  } 
  return err
}

function emailchk(data)
{
  err=null
  email(data.email)
  return err
}

function passchk(data) {
  err=null
  password(data)
}
export {signinval,signupval,postval,emailchk,passchk}