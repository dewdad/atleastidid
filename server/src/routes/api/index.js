const router = require('express').Router()

router.use('/v1', require('./v1/authentication'))
router.use('/v1', require('./v1/system'))

router.use(function (err, req, res, next) {
  if (err) {
    return res.status(400).send({
      error: 'Error from /routes/api/v1/index.js'
    })
  }

  return next()
})

module.exports = router