const router = require('express').Router()

router.get('/health', (req, res) => {
  return res.status(500).send({
    error: 'It\'s Alive!!!'
  })
})

module.exports = router