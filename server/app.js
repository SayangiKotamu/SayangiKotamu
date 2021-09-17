"use strict"
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.listen(port, function(){
    console.log('running '+ port);
})  