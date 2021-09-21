const routers = require('express').Router()
const ReportController = require('../controllers/reportController')
const {Userauth, authEmailUser} = require('../middlewares/auth')

routers.use(Userauth, authEmailUser)
routers.get('/', ReportController.showAll)
routers.get('/:id', ReportController.getById)

routers.get('/category/:category', ReportController.showByCategory)
routers.post('/', ReportController.addReport)
routers.patch('/up/:id', ReportController.upVoteByIdReport)
routers.patch('/down/:id', ReportController.downVoteByIdReport)

module.exports = routers
