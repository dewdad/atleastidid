const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const errorhandler = require('errorhandler')
const app = express()
const models = require('./models')
const PORT = process.env.PORT || 4000

const environment = process.env.NODE_ENV || null

if (environment === 'development') {
  app.use(cors())
  app.use(errorhandler())
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

require('./routes/authentication')(app)

app.get('/health', (req, res) => {
  return res.status(500).send({
    error: 'It\'s Alive!!!'
  })
})

// catch 404, forward to error handler
app.use((req, res, next) => {
  let err = new Error('404 Not Found.')
  err.status = 404
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
    console.log('thoughtsub web server listenting on port:', PORT)
  })
})