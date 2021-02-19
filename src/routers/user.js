const express = require('express')
const userController = require('../controllers/user')
const { authentication, authorization } = require('../helpers/auth')

const router = express.Router()

router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/refreshtoken', userController.refreshToken)

module.exports = router