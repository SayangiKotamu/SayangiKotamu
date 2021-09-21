const routers = require('express').Router()
const categoriesController = require('../controllers/categoriesController')
const {Userauth, authEmailUser} = require('../middlewares/auth')

routers.use(Userauth, authEmailUser)
routers.get('/', categoriesController.showAll)

module.exports = routers
