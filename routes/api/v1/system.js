const router = require('express').Router()
const SystemController = require('../../../controllers/system')

router.get('/health', SystemController.health)

module.exports = router