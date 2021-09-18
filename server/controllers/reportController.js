const Report = require("../models/report");

class ReportController {
  // ! USER REPORT
  static async showAll(req, res, next) {
    try {
      let data = await Report.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }

  static async showByCategory(req, res, next) {
    try {
      const data = await Report.findOne({ category: req.params.category });
      if (data) {
        res.status(200).json(data);
      } else {
        next({
          name: "NotFound",
          message: "not found",
        });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async addReport(req, res, next) {
    try {
      let newReport = {
        title: req.body.title,
        reportIdNumber: req.body.reportIdNumber,
        user: req.body.user, //req.user.id
        dinas: req.body.dinas,
        status: "diterima",
        description: req.body.description,
        issuedDate: new Date(),
        location: req.body.location,
        lat: +req.body.lat,
        long: +req.body.long,
        category: req.body.category,
        picture: req.body.picture,
      };
      let data = await Report.create(newReport);
      res.status(201).json({ ...newReport, _id: data.insertedId });
    } catch (error) {
      next(error)
    }
  }
  static async patchVoteByIdReport(req, res, next) {}
  static async patchStatusReport(req, res, next) {}
  static async deleteReport(req, res, next) {}

  // ! DINAS REPORT
  static async dinasGetAllReports(req, res, next) {
    try {
      res.send("will auth");
    } catch (err) {}
  }
}

module.exports = ReportController;
