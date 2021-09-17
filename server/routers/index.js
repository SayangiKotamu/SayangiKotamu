const routers = require('express').Router();
const userRouters = require('./user')
const reportUserRouters = require('./reportUser')

routers.use('/',userRouters)
routers.use('/reportUser',reportUserRouters)

module.exports=routers;