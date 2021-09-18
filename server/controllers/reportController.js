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
      res.status(400).json(error);
    }
  }
  static async editReport(req, res, next) {}
  static async deleteReport(req, res, next) {}

  // ! DINAS REPORT
  static async dinasGetAllReports(req, res, next) {
    const { id, email, role } = req.user;
    const { status, category } = req.query;
    try {
      if (status) {
        const allReports = await Report.find({ dinas: id, status });
        res.status(200).json(allReports);
      } else if (category) {
        const allReports = await Report.find({ dinas: id, category });
        res.status(200).json(allReports);
      } else {
        const allReports = await Report.find({ dinas: id });
        res.status(200).json(allReports);
      }
    } catch (err) {
      next(err);
    }
  }

  static async dinasGetByIdReport(req, res, next) {
    const { id } = req.params;
    try {
      const foundReport = await Report.findOne({ _id: id });
      if (foundReport) {
        res.status(200).json(foundReport);
      } else {
        throw { name: "ReportNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async changeStatus(req, res, next) {
    const { id } = req.params;
    let finishedDate = null;
    if (req.body.status === "selesai") {
      finishedDate = new Date();
    }
    const payload = {
      status: req.body.status,
      finishedDate,
    };
    try {
      const foundReport = await Report.findOne({ _id: id });
      if (foundReport) {
        await Report.updateOne({ _id: id }, payload);
        const updatedReport = await Report.findOne({ _id: id });

        res.status(200).json(updatedReport);
      } else {
        throw { name: "ReportNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteReport(req, res, next) {
    const { id } = req.params;
    try {
      const foundReport = await Report.findOneAndDelete({ _id: id });
      if (foundReport) {
        res.status(200).json(foundReport);
      } else {
        throw { name: "ReportNotFound" };
      }
    } catch (err) {
      next(err);
      console.log(err);
    }
  }
}

module.exports = ReportController;
