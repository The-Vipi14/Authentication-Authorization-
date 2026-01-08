const express = require('express');
const { register, login, profile, isLoggedIn,logout } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', auth, profile)
router.get('/me',auth,isLoggedIn)
router.post('/logout',logout)

module.exports = router 