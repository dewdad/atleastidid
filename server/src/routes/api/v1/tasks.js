const router = require('express').Router()
const AuthController = require('../../../controllers/authentication')
const TasksController = require('../../../controllers/tasks')

router.get('/task/:id', AuthController.authRequired, TasksController.getTask)

router.get('/tasks', AuthController.authRequired, TasksController.index)

router.post('/tasks', AuthController.authRequired, TasksController.create)

router.post('/tasks/:id/complete', AuthController.authRequired, TasksController.complete)

router.delete('/tasks/:id', AuthController.authRequired, TasksController.delete)

module.exports = router