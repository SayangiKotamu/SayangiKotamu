const routers = require('express').Router()
const userRouters = require('./user')
const reportUserRouters = require('./reportUser')
const dinasRouters = require('./dinas/dinas')
const aspirationRouters = require('./aspiration')
const notificationsRouters = require('./notifications')
const announcmentRouters = require('./announcment')
const categoryRouters = require('./categories')

routers.use('/', userRouters)
routers.use('/reportUser', reportUserRouters)
routers.use('/dinas', dinasRouters)
routers.use('/aspirations', aspirationRouters)
routers.use('/notifications', notificationsRouters)
routers.use('/announcments', announcmentRouters)
routers.use('/categories', categoryRouters)

module.exports = routers
