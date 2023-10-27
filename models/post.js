const mongoose = require('mongoose') //mongoose required
const schema = mongoose.Schema

//Schema for creating new post
const post = new schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32
  },
  author: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true,

  },
  image:{
    type:String,
    required: true
  }
},{timestamps: true})

module.exports = mongoose.model('Post',post)