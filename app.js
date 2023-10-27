require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cookieparser = require('cookie-parser')
const cors = require('cors')

const Post = require('./models/post')



//my routes importing
const postRoute = require('./routers/post')
const userRoute = require('./routers/user')


//db connection
mongoose
.connect(process.env.DB,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log('db connected'))
.catch((err)=>console.log('db crashed'))

mongoose.set('useFindAndModify', false)

//middlewares
app.use(express.json())
app.use('/uploads',express.static('uploads'))
app.use(cookieparser())
app.use(cors())

//my routes
app.use('/api',postRoute)
app.use('/api',userRoute)


//PORT
const port = process.env.PORT || 8000

//heroku
if(process.env.NODE_ENV=="production")
{
  app.use(express.static("final-front/build"))
}

//Starting a server
app.listen(port,() => console.log(`app is running at ${port}`))