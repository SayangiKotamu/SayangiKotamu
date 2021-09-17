const routers = require('express').Router();
const ReportUserController = require('../controllers/reportUserController');

routers.get('/', ReportUserController.showAll)
routers.get('/:category', ReportUserController.showByCategory)
routers.post('/', ReportUserController.addReport)
routers.put('/', ReportUserController.editReport)
routers.delete('/:id', ReportUserController.deleteReport)

module.exports= routers