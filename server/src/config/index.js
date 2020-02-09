const dotenv = require('dotenv')
if (process.env.NODE_ENV === 'development') {
  dotenv.config()
}
module.exports = {
  port: process.env.PORT || 4000,
  session: {
    secret: 'session-secreto'
  },
  db: {
    name: process.env.DB_NAME || 'thoughtsub_db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    options: {
      dialect: process.env.DB_DIALECT || 'mysql',
      host: process.env.DB_HOST || 'localhost'
    },
  },
  auth: {
    secret: process.env.SECRET || 'secreto'
  }
}