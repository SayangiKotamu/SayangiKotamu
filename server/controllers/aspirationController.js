const Aspiration = require("../models/aspiration");
const Dinas = require("../models/dinas");
const User = require("../models/user");

class AspirationController {
  static async getAll(req, res, next) {
    const { id } = req.user;

    try {
      const getAspirations = await Aspiration.find({ user: id });
      res.status(200).json(getAspirations);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;

    try {
      const getAspiration = await Aspiration.findOne({ _id: id });
      res.status(200).json(getAspiration);
    } catch (err) {
      next(err);
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
      console.log(err);
    }
  }
}

module.exports = AspirationController;
