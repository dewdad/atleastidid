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
    console.log('/register', req.body)
    try {
      const user = await User.create(req.body)
      res.status(200).send({ user })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    console.log('/login', User)
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: { email: email }
      })
      // console.log(email, password, user)
      console.log('\n\n\n', user.comparePassword(password), '\n\n\n')
      const isPasswordOk = await user.comparePassword(password)
      const loginErr = {
        error: 'Invalid password or username.'
      }
      if (!user) {
        return res.status(404).send(loginErr)
      }
      if (!isPasswordOk) {
        return res.status(401).send(loginErr)
      }
      
      console.log({
        user,
        token: jwtSignUser(user)
      })
      res.status(200).send({
        user: user,
        token: jwtSignUser(user)
      })
    } catch(err) {
      console.log(err)
      res.status(401).send({
        error: 'User is unauthorized.'
      })
    }
  }
}