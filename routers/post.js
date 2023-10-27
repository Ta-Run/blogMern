const express = require("express")
const {post,getposts,postdel} = require("../controllers/post")
const router = express.Router()
const multer = require('multer')
const {isAuthenticated} = require('../middleware/iswho')

const storage = multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'./uploads')
  },
  filename: (req,file,cb)=>{
    cb(null,file.originalname)
  }
})
const upload = multer({storage:storage})

router.post('/post',isAuthenticated,upload.single('image'),post)

router.get('/posts',getposts)
router.delete('/postdel/:id',isAuthenticated,postdel)

module.exports = router