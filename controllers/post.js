//Requiring models from models folder
const Post = require('../models/post')
const User = require('../models/user')


//exporting functions to be used in routers

//creates new post
exports.post = (req,res) => {
  req.body.image = req.file.filename
  const post = new Post(req.body)
  post.save((err,posted)=>{
    if(err)
      return res.json({
        err : 'Not able save the post, submit again'
      })
    User.findOneAndUpdate({_id:res.locals.id},{$push: {posts : posted._id }},{new:true})
    .then(()=>res.json('success'))
    .catch(err=>res.json({err:'try again'}))
  })
}





exports.getposts = (req,res) => {
  Post.find({},(err,result) => {
    if(err)
      res.json(err)
    res.json(result)
  })
  }

exports.postdel = (req,res) => {
  Post.findOneAndDelete({_id:req.params.id})
  .then(del=>res.json('Success'))
  .catch(err=>res.json({err:'Unable to delete'}))
}