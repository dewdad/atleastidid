const Sequelize = require('sequelize')
const config = require('../config')

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  config.db.options
)
  
const models = {} 
models.sequelizeInstance = sequelize
models.User = require('./user')(sequelize)

// const User = models.user.create({
//   email: 'nher1625@gmail.com',
//   password: 'password'
// })
// console.log(models)
module.exports = models