const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')

const db = {}

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  config.db.options
)

console.log(config.db)