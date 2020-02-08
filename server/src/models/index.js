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
const User = models.User = require('./user')(sequelize)
const Task = models.Task = require('./task')(sequelize)

Object.keys(models).forEach(function (modelName) {
  if ('associate' in models[modelName]) {
    // console.log('associate!!', models[modelName])
    models[modelName].associate(models)
  }
})

module.exports = models