const Sequelize = require('sequelize')
const bcrypt = require('bcrypt-nodejs')

module.exports = (sequelizeInstance) => {
  let User = sequelizeInstance.define('Users', {
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING
    }
  })
  return User
}