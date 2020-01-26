const router = require('express').Router()
const User = require('../../../models').User
const AuthController = require('../../../controllers/authentication')

router.get('/user', AuthController.authRequired, function (req, res,) {
  if (!req.token && !req.payload) {
    res.status(401).send({
      error: 'Unauthorized.'
    })
  } else {
    User.findByPk(req.payload.id).then((user) => {
      if (!user) res.status(404).send({
        error: 'User not found.'
      })
      return res.status(200).send({
        user: user
      })
    }).catch(err => {
      return res.status(500).send({
        error: 'Error getting user.'
      })
    })    
  }
})

module.exports = router