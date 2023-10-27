require('dotenv')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')




//exporting functions to be used in routers

//signs up user
exports.signup =  async (req,res) => {
  var user = await User.findOne({email:req.body.email})
    if(user)
      return res.json({err:'User already exists'})
    
  user = new User(req.body)
  user.save( async (err,user) => {
    if(err)
      return res.json({err : "NOT able to save user in DB"})
      const token = await jwt.sign({
        _id:user._id,
         role:user.role},process.env.SECRET) //token creation
        if(!token)
          return res.json({err:'Internal error please try agin after some time'})
        res.cookie('blog',token)
        res.json('sucess')
   
  })
  
}

//signs in user and saves cookie
exports.signin = async (req,res) => {
  const {email,password} = req.body
  const user = await User.findOne({email:email}) //email exists check
  if(!user)
    return res.json({err:'Email do not exists'})
  
  const match = await bcrypt.compare(password,user.password) //password check
  if(!match)
    return res.json({err:'Password do not match'})
  
  try
 { const token = await jwt.sign({
   _id:user._id,
  role:user.role},process.env.SECRET) //token creation
  res.cookie('blog',token)
  res.json('Success')
 
} catch(err){
  return res.json({err:'Internal error please try agin after some time'})

 }
}

exports.account = (req,res) => {
  User.findOne({_id:res.locals.id},{ name: 1, lastname: 1 ,email:1 ,posts:1,_id:0,role:1})
  .populate('posts')
  .then((user)=>res.json(user))
  .catch((err)=>res.json({err:'Unable to Access Details'}))
}

exports.ForgetExists = (req,res) => {
  User.findOne({email:req.body.email})
  .then(async user => {
    const token = await jwt.sign({
      _id:user._id},process.env.SECRET)
      if(!token)
        return res.json({err:'Internal error please try agin after some time'})
      
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.USER,
            pass: process.env.PASS
          }
        })
      
      var mailOptions = {
        from: process.env.USER,
        to: req.body.email,
        text: `Click on link to change password http://localhost:3000/forget/resolve/${token}`,
        subject : 'Password Reset'
        
      }

      transporter.sendMail(mailOptions, function(error, info){
        if (error)
          return res.json({err:'Try again'})
          
          res.json('Email Sent')
          
          
        
      })
      

  })
  .catch(err => res.json({err:'Not Found'}))
}

exports.ForgetResolve = (req,res) => {
  jwt.verify(req.params.token,process.env.SECRET,(err,decoded) => {
    if(err)
      return res.json({err:'Not a valid user'})

      
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.pwd, salt, (err, hash) => {
            // Now we can store the password hash in db.
            if(err)
              return res.json({err: "Internal Error"})
            
              User.findOneAndUpdate({_id:decoded._id},{password : hash}, {new: true},(err,docs) => {
              if (err)
              return res.json({err: "Try after some time"}) 
              res.json('Success')
            })
        })
    })
  })
}

exports.getUsers = (req,res) => {

    User.find({},{ name: 1, lastname: 1 ,email:1,role:1})
    .then(users => res.json(users))
    .catch((err)=>res.json({err:'Unable to Access Data'}))
  
}

exports.deluser = (req,res) => {
  User.findByIdAndDelete(req.params.id)
  .then(del=>res.json('Success'))
  .catch(err=>res.json('failure'))
}


