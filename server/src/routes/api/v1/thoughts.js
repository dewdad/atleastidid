const router = require('express').Router()
const Thought = require('../../../models').Thought
const AuthController = require('../../../controllers/authentication')
const ThoughtsController = require('../../../controllers/thoughts')

router.post('/thoughts', AuthController.authRequired, ThoughtsController.createThought)

module.exports = router