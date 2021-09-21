const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  slug: {
    type: String,
  },
  reports: [],
});

const Categories = mongoose.model("Categories", categoriesSchema);
module.exports = Categories;
