const router = require('express').Router()
const AuthController = require('../../../controllers/authentication')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/logout', AuthController.logout)

module.exports = router