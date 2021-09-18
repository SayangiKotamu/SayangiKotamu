const Aspiration = require("../models/aspiration");

class AspirationController {
  static async getAll(req, res, next) {
    try {
      res.send("test");
    } catch (err) {
      console.log(err);
    }
  }

  static async create(req, res, next) {
    try {
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = AspirationController;
