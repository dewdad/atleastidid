const router = require('express').Router()
const AuthController = require('../../../controllers/authentication')
const TasksController = require('../../../controllers/tasks')

router.get('/tasks', AuthController.authRequired, TasksController.index)

// router.get('/tasks/add', AuthController.authRequired, (req, res) => {
//   req.session.user += 1
//   console.log(req.session.user)
//   res.status(200).send({  
//     message: 'You GET the add-task view.',
//     status: 200
//   })
// })

router.post('/tasks', AuthController.authRequired, TasksController.create)

router.post('/tasks/:id/complete', AuthController.authRequired, TasksController.complete)

router.delete('/tasks/:id', AuthController.authRequired, TasksController.delete)

module.exports = router