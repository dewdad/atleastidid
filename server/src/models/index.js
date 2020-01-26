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
models.Thought = require('./thought')(sequelize)

models.User.hasMany(models.Thought)

module.exports = models