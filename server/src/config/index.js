const dotenv = require('dotenv')
dotenv.config({ path: '../.env' })

module.exports = {
  port: process.env.PORT,
  session: {
    secret: process.env.SESSION_SECRET
  },
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
      dialect: 'mysql',
      host: process.env.DB_HOST
    },
  },
  auth: {
    secret: process.env.SECRET
  }
} 