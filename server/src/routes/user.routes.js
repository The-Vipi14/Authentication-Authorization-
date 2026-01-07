const express = require('express');
const { register, login, profile, isLoggedIn } = require('../controllers/user.controller')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', profile)
router.get('/me', isLoggedIn)

module.exports = router 