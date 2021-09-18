const mongoose = require("mongoose")

const categoriesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    }
})

const Categories = mongoose.model("Categories",categoriesSchema);
module.exports = Categories