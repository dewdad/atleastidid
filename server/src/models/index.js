const Sequelize = require('sequelize')
const config = require('../config')

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  config.db.options
)
  
const models = {} 
models.User = require('./user')(sequelize)
models.Task = require('./task')(sequelize)
Object.keys(models).forEach(function (modelName) {
  console.log(modelName)
  if ('associate' in models[modelName]) {
    // console.log('associate!!', models[modelName])
    models[modelName].associate(models)
  }
})

models.sequelizeInstance = sequelize
module.exports = models