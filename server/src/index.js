const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const errorhandler = require('errorhandler')
const PORT = process.env.PORT || 4000

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionSecret = require('./config').session.secret


const models = require('./models')
const app = express()

const sessionStore = new SequelizeStore({
  db: models.sequelizeInstance
})

const environment = process.env.NODE_ENV || 'development'

console.log('\n\nenvironment [/server/src/index.js](ln: 13)', {
  environment
}, '\n\n')

app.use(session({
  secret: sessionSecret,
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true,
    maxAge: 10 * 1000
  }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
console.log(
  '\n\nSetting middlewares: errorhandler and morgan [/server/src/index.js](ln: 18)\n\n'
)
app.use(errorhandler())
app.use(morgan('common'))
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }))
app.use(express.static(__dirname + '/public'))

// Routes
app.use(require('./routes'))

// catch 404, forward to error handler
app.use((req, res, next) => {
  let err = new Error('404 Not Found.')
  err.status = 404
  console.log('Error Handler Middleware [/server/src/index.js](ln: 31)', {
    err,
    errStatus: err.status
  })
  next(err)
})

// development error handler
if (environment !== 'production') {
  app.use((err, req, res, next) => {
    console.info('Stacktrace:')
    console.error(err.stack)
    res.status(err.status || 500)
    res.send({
      'errors': { message: err.message, error: err }
    })
  })
}

models.sequelizeInstance.sync().then(() => {
  app.listen(PORT, () => {
    console.log('app web server listenting on port:', PORT)
  })
})