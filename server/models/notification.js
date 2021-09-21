const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    date: {
        type: Date,
    },
    user: {
        type: String,
    },
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
