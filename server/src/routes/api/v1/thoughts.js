const router = require('express').Router()
const AuthController = require('../../../controllers/authentication')
const ThoughtsController = require('../../../controllers/thoughts')

router.get('/thoughts', AuthController.authRequired, ThoughtsController.index)

router.post('/thoughts', AuthController.authRequired, ThoughtsController.create)

router.delete('/thoughts/:id', AuthController.authRequired, ThoughtsController.delete)

module.exports = router