const router = require('express').Router()
const AuthController = require('../../../controllers/authentication')

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/logout', (req, res) => {
  if (req.session.user) {
    let id = req.session.userId
    res.clearCookie('connect.sid', {
      path: '/'
    });
    req.session.destroy((err) => {
      if (err) console.error(err)
      res.status(200).send({
        message: 'Successfully destroyed user ' + id + ' session'
      }).redirect('/')
    })
  } else {
    res.status(500).send({
      message: 'User is not logged in, cannot logout.'
    })
  }
  
})

module.exports = router