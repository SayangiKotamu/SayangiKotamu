const Dinas = require("../models/dinas");
const Rating = require("../models/rating");
const Report = require("../models/report");

class RatingController {
  static async getAll(req, res, next) {
    console.log("masukkk");
    const { id, role } = req.user;
    try {
      console.log(role);
      if (role === "dinas") {
        const getRating = await Rating.find({ dinas: id });
        res.status(200).json(getRating);
      } else {
        const getRating = await Rating.find({ user: id });
        res.status(200).json(getRating);
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
      const getRating = await Rating.findOne({ _id: id });
      if (getRating) {
        res.status(200).json(getRating);
      } else {
        throw {
          name: "NotFound",
          message: `Rating with id ${id} not found`,
        };
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
      rating: req.body.rating,
      comment: req.body.comment,
      user: id,
    };
    try {
      const dinas = await Dinas.findOne({ _id: req.body.dinas });
      payload.dinas = dinas;
      const report = await Report.findOne({ _id: req.body.report });
      payload.report = report;
      if (String(report.user) === String(id)) {
        throw { name: "duplicateRating", message: "duplicate rating" };
      } else {
        const createRating = await Rating.create(payload);
        const newRating = Number((dinas.rating + createRating.rating) / 2);
        await Dinas.updateOne({ _id: dinas._id }, { rating: newRating });
        res.status(201).json(createRating);
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
}
module.exports = RatingController;
