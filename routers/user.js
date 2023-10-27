const express = require("express")
const router = express.Router()
const {signup,signin,account,ForgetExists,ForgetResolve,getUsers,deluser} = require('../controllers/user')
const {isAuthenticated,isAdmin} = require('../middleware/iswho')

router.post('/signup',signup)
router.post('/signin',signin)
router.get('/account',isAuthenticated,account)
router.get('/Isadmin',isAuthenticated,isAdmin)
router.post('/forget',ForgetExists)
router.patch('/forget/resolve/:token',ForgetResolve)
router.get('/users',getUsers)
router.delete('/userdel/:id',deluser)


module.exports = router