const Report = require("../models/report");

class ReportController {
  // ! USER REPORT
  static async showAll(req, res, next) {
    try {
      let data = await Report.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  static async showByCategory(req, res, next) {
    try {
      const data = await Report.findOne({category:req.params.category});
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
          reportIdNumber : req.body.reportIdNumber,
          UserId : req.body.UserId,//req.user.id
          DinasId : req.body.DinasId,
          status : "diterima",
          description : req.body.description,
          issuedDate : new Date(),
          location : req.body.location,
          lat : req.body.lat,
          long : req.body.long,
          category : req.body.category,
          picture : req.body.picture
      }
      let data = await Report.create(newReport)
      res.status(201).json({...newReport, _id:data.insertedId})
    } catch (error) {
        res.status(400).json(error)
    }
  }
  static async editReport(req, res, next) {}
  static async deleteReport(req, res, next) {}

  // ! DINAS REPORT
  static async dinasGetAllReports(req, res, next) {
    try {
    } catch (err) {}
  }
}

module.exports = ReportController;
