const Aspiration = require("../models/aspiration");
const Dinas = require("../models/dinas");
const User = require("../models/user");

class AspirationController {
  // ! USER
  static async getAll(req, res, next) {
    const { id, role } = req.user;
    console.log(req.user);

    try {
      if (role === "dinas") {
        const getAspirations = await Aspiration.find({ dinas: id });
        res.status(200).json(getAspirations);
      } else {
        const getAspirations = await Aspiration.find({ user: id });
        res.status(200).json(getAspirations);
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

  static async getById(req, res, next) {
    const { id } = req.params;
    try {
      const getAspiration = await Aspiration.findOne({ _id: id });
      if (getAspiration) {
        res.status(200).json(getAspiration);
      } else {
        throw {name:"NotFound", message:`aspirations with id ${id} not found`}
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

  static async create(req, res, next) {
    const { id } = req.user;

    const payload = {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      user: id,
    };
    try {
      const dinas = await Dinas.findOne({ _id: req.body.dinas });
      payload.dinas = dinas;
      const createAspiration = await Aspiration.create(payload);
      await Dinas.findByIdAndUpdate(
        { _id: req.body.dinas },
        {
          $push: {
            aspirations: { _id: createAspiration._id, ...payload },
          },
        },
        { new: true, useFindAndModify: false }
      );
      await User.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            aspirations: { _id: createAspiration._id, ...payload },
          },
        },
        { new: true, useFindAndModify: false }
      );
      const foundAspiration = await Aspiration.findOne({
        _id: createAspiration._id,
      });
      res.status(201).json(foundAspiration);
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

  // ! DINAS
}

module.exports = AspirationController;
