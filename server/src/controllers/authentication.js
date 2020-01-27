const models = require('../models')
const User = models.User
const jwt = require('jsonwebtoken')
const config = require('../config')

const jwtSignUser = (user) => {
  return jwt.sign({
    user
  },
  config.auth.secret,
  {
    expiresIn: '1 hour'
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.status(200).send({ user })
    } catch (err) {
      console.log(err, '\n\n\n')
      res.status(400).send({
        error: err,
        message: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: { email: email }
      })
      const isPasswordOk = await user.comparePassword(password)
      const loginErr = {
        message: 'Invalid password or username.'
      }
      if (!user) {
        return res.status(404).send(loginErr)
      }
      if (!isPasswordOk) {
        return res.status(401).send(loginErr)
      }
      res.status(200).send({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        token: jwtSignUser(user)
      })
    } catch(err) {
      console.log(err)
      res.status(401).send({
        error: 'User is unauthorized.'
      })
    }
  },
  authRequired (req, res, next) {
    let auth = req.headers.authorization || req.headers.Authorization
    if (auth) {
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, config.auth.secret, function(err, decoded) {
        if (err) {
          console.error(err)
          req.token = null
          return false
        } else {
          req.token = token
          req.payload = decoded.user
          return true
        }
      })
    } 
    next()
  }
}
