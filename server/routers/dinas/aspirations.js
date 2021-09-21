const AspirationController = require('../../controllers/aspirationController')

const router = require('express').Router()

router.get('/', AspirationController.getAll)

router.get('/:id', AspirationController.getById)

module.exports = router
