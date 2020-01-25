const User = require('../models').User
const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body)
            res.send({ user })
        } catch(err) {
            res.status(400).send({
                error: 'This email account is already in use.'
            })
        }
    }
}