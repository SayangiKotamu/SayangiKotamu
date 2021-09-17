const Dinas = require("../models/dinas");

class DinasController {
  static async register(req, res, next) {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      //   const foundEmail = await Dinas.findOne({ email: payload.email });
      //   if (foundEmail) {
      //     throw { name: "EmailInCollection" };
      //   } else {
      const createDinas = await Dinas.create(payload);
      console.log(createDinas);
      //   }
    } catch (err) {
      //   console.log(errMessage);
      //   if (!err.errors) {
      //     next(err);
      //   } else {
      const toArray = Object.values(err.errors);
      const errMessage = toArray.map((el) => {
        return el.message;
      });
      res.status(400).json({ message: errMessage });
      //   }
    }
  }
}

module.exports = DinasController;
