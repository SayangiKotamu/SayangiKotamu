'use strict'
// if (process.env.NODE_ENV === "development") {
// }
require('dotenv').config()
const express = require('express')
const routers = require('./routers')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
require('./config/mongoose')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', routers)
app.use(errorHandler)

module.exports = app
