const Dinas = require("../models/dinas");
const { jwtSign } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bcrypt");

class DinasController {
  static async register(req, res, next) {
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "dinas",
    };

    try {
      const foundEmail = await Dinas.findOne({ email: payload.email });
      if (foundEmail) {
        throw { name: "EmailInCollection" };
      } else {
        const createDinas = await Dinas.create(payload);
        const foundDinas = await Dinas.findOne({ _id: createDinas._id });
        res.status(201).send(foundDinas);
      }
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

  static async login(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const foundEmail = await Dinas.findOne({ email: payload.email }).select(
        "+password"
      );
      if (foundEmail) {
        const verifiedPassword = comparePassword(
          payload.password,
          foundEmail.password
        );
        if (verifiedPassword) {
          const accessToken = jwtSign({
            id: foundEmail._id,
            email: foundEmail.email,
          });
          res.status(200).json({
            accessToken,
            email: foundEmail.email,
            id: foundEmail._id,
          });
        } else {
          throw { name: "WrongEmailPassword" };
        }
      } else {
        throw { name: "WrongEmailPassword" };
      }
    } catch (err) {
      if (err.name === "WrongEmailPassword") {
        next(err);
      }
    }
  }

  static async showListDinas(req, res, next) {
    try {
      let data = await Dinas.find();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DinasController;
