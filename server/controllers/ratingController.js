const Dinas = require("../models/dinas");
const Rating = require("../models/rating");
const Report = require("../models/report");

class RatingController {
  static async getAll(req, res, next) {
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
      next(err);
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
      next(err);
    }
  }
  static async create(req, res, next) {
    const { id } = req.user;

    // ! LATER: AUTHORIZATION
    const payload = {
      rating: req.body.rating,
      comment: req.body.comment,
      user: id,
    };
    try {
      const allReportInRating = await Rating.findOne({
        report: req.body.report,
      });
      if (allReportInRating) {
        throw { name: "duplicateRating" };
      } else {
        const dinas = await Dinas.findOne({ _id: req.body.dinas });
        payload.dinas = dinas;
        const report = await Report.findOne({ _id: req.body.report });
        payload.report = report;
        const createRating = await Rating.create(payload);
        const allDinasInRating = await Rating.find({ dinas: req.body.dinas });
        let allRating = 0;
        for (let i = 0; i < allDinasInRating.length; i++) {
          let rate = allDinasInRating[i].rating;
          allRating += rate;
        }
        let divider = allDinasInRating.length;

        const newRating = (allRating / divider).toFixed(2);
        console.log(newRating);
        await Dinas.updateOne({ _id: dinas._id }, { rating: newRating });
        res.status(201).json(createRating);
      }
    } catch (err) {
      console.log(err);
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
