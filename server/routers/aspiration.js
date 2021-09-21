const router = require('express').Router()
const AspirationController = require('../controllers/aspirationController')
const {Userauth, authEmailUser} = require('../middlewares/auth')

router.use(Userauth, authEmailUser)

router.get('/', AspirationController.getAll)

router.get('/:id', AspirationController.getById)

router.post('/create', AspirationController.create)

module.exports = router
