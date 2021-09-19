const Categories = require("../models/categories");

class categoriesController {
  static async showAll(req, res, next) {
    try {
      let data = await Categories.find();
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async addCategories(req, res, next) {
    const { name } = req.body;

    const slug = name.toLowerCase().replace(" ", "_");
    try {
      let newCategories = {
        name,
        slug,
      };
      let data = await Categories.create(newCategories);
      res.status(201).json({ ...newCategories, _id: data._id });
    } catch (err) {
      if (!err.errors) {
        next(err);
      } else {
        const toArray = Object.values(err.errors);
        const errMessage = toArray.map((el) => {
          return el.message;
        });
        res.status(400).json({ message: errMessage });
      }
    }
  }
  static async editCategories(req, res, next) {
    const { name } = req.body;

    const slug = name.toLowerCase().replace(" ", "_");
    try {
      let updateCategories = {
        name,
        slug,
      };
      let data = await Categories.findOneAndUpdate(
        { _id: req.params.id },
        { $set: updateCategories },
        { new: true }
      );
      if (data) {
        res.status(201).json(data);
      } else {
        next({
          name: "NotFound",
          message: "Categories Not Found",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  static async deleteCategories(req, res, next) {
    try {
      let data = await Categories.findOneAndDelete({ _id: req.params.id });
      if (data) {
        res.status(201).json(data);
      } else {
        next({
          name: "NotFound",
          message: "Categories Not Found",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = categoriesController;
