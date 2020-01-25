const AuthController = require('../controllers/authentication')

module.exports = (app) => {
  app.post('/register', AuthController.register)
  app.post('/login', AuthController.login)
}