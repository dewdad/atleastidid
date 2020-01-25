const AuthController = require('../controllers/authentication')

module.exports = (app) => {
  app.post('/register', AuthController.register)
}