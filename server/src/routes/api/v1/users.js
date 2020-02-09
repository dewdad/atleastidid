const router = require('express').Router()
const User = require('../../../models').User
const AuthController = require('../../../controllers/authentication')

router.get('/user', AuthController.authRequired, function (req, res,) {
  User.findByPk(req.payload.id).then((user) => {
    if (!req.session.userId && !user) res.status(404).send({
      error: 'User not found.'
    }).redirect('/')
    req.session.user = {
      // username: user.username,
      email: user.email,
      createdAt: user.createdAt
    }
    return res.status(200).send({
      user: {
        id: user.id,
        // username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })
  }).catch(err => {
    return res.status(500).send({
      error: err,
      message: 'Error getting user.'
    })
  })    
})

module.exports = router