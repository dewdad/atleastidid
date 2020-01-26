const router = require('express').Router()

router.use('/v1', require('./v1/authentication'))
router.use('/v1', require('./v1/system'))
router.use('/v1', require('./v1/users'))
router.use('/v1', require('./v1/thoughts'))

router.use(function (err, req, res, next) {
  if (err) {
    console.log('Last ERROR catch:', err)
    return res.status(err.status || 500).send({
      error: err.message
    })
  }

  return next()
})

module.exports = router