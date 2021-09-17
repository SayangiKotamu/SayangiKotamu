const Dinas = require("../models/dinas");

class DinasController {
  static async register(req, res, next) {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      console.log(payload);
      const createDinas = await Dinas.create(payload);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = DinasController;
