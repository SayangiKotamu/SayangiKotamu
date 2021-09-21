const { ObjectId } = require("bson");

const Categories = require("../models/categories");
const Report = require("../models/report");
const Dinas = require("../models/dinas");
const User = require("../models/user");

class ReportController {
  // ! USER REPORT
  static async showAll(req, res, next) {
    try {
      let data = await Report.find()
        .populate("dinas")
        .populate("user")
        .populate("category");
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;
    try {
      const foundReport = await Report.findOne({ _id: id })
        .populate("dinas")
        .populate("user")
        .populate("category");
      if (foundReport) {
        res.status(200).json(foundReport);
      } else {
        throw { name: "ReportNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async showByCategory(req, res, next) {
    try {
      const data = await Report.find({ category: req.params.category })
        .populate("dinas")
        .populate("user")
        .populate("category");

      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error);
    }
  }
  static async addReport(req, res, next) {
    try {
      let newReport = {
        title: req.body.title,
        user: req.user.id,
        status: "diterima",
        description: req.body.description,
        issuedDate: new Date(),
        location: req.body.location,
        lat: +req.body.lat,
        long: +req.body.long,
        picture: req.body.picture,
        upVote: 0,
        downVote: 0,
      };
      let categories = await Categories.findOne({ _id: req.body.category });
      newReport.category = categories;
      let dinas = await Dinas.findOne({ _id: req.body.dinas });
      newReport.dinas = dinas;
      let data = await Report.create(newReport);
      // ! AFTER CREATE SHOULD PUSH AN ARRAY INTO DINAS AND USERS
      await Dinas.findByIdAndUpdate(
        { _id: req.body.dinas },
        {
          $push: {
            reports: { _id: data._id, ...newReport },
          },
        },
        { new: true, useFindAndModify: false }
      );
      await User.findByIdAndUpdate(
        { _id: newReport.user },
        {
          $push: {
            reports: { _id: data._id, ...newReport },
          },
        },
        { new: true, useFindAndModify: false }
      );
      await Categories.findByIdAndUpdate(
        { _id: req.body.category },
        {
          $push: {
            reports: { _id: data._id, ...newReport },
          },
        },
        { new: true, useFindAndModify: false }
      );
      res.status(201).json({ _id: data._id, ...newReport });
    } catch (error) {
      const toArray = Object.values(error.errors);
      const errMessage = toArray.map((el) => {
        return el.message;
      });
      res.status(400).json({ message: errMessage });
    }
  }
  static async upVoteByIdReport(req, res, next) {
    //cek user dulu udah pernah vote belum yg ini belum di handle
    try {
      let data = await Report.findOne({ _id: req.params.id });
      if (data) {
        let nowVote = data.upVote + 1;
        let vote = await Report.updateOne(
          { _id: req.params.id },
          { upVote: nowVote }
        );
        await Dinas.updateOne(
          {
            "reports._id": ObjectId(req.params.id),
          },
          {
            $set: {
              "reports.$.upVote": `${nowVote}`,
            },
          },
          { new: true, useFindAndModify: false }
        );
        await User.updateOne(
          {
            "reports._id": ObjectId(req.params.id),
          },
          {
            $set: {
              "reports.$.upVote": `${nowVote}`,
            },
          },
          { new: true, useFindAndModify: false }
        );
        await Categories.updateOne(
          {
            "reports._id": ObjectId(req.params.id),
          },
          {
            $set: {
              "reports.$.upVote": `${nowVote}`,
            },
          },
          { new: true, useFindAndModify: false }
        );
        res.status(200).json(vote);
      } else {
        throw { name: "ReportNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async downVoteByIdReport(req, res, next) {
    //cek user dulu udah pernah vote belum
    try {
      let data = await Report.findOne({ _id: req.params.id });
      if (data) {
        let nowVote = data.downVote + 1;
        let vote = await Report.updateOne(
          { _id: req.params.id },
          { downVote: nowVote }
        );
        await Dinas.updateOne(
          {
            "reports._id": ObjectId(req.params.id),
          },
          {
            $set: {
              "reports.$.downVote": `${nowVote}`,
            },
          },
          { new: true, useFindAndModify: false }
        );
        await User.updateOne(
          {
            "reports._id": ObjectId(req.params.id),
          },
          {
            $set: {
              "reports.$.downVote": `${nowVote}`,
            },
          },
          { new: true, useFindAndModify: false }
        );
        await Categories.updateOne(
          {
            "reports._id": ObjectId(req.params.id),
          },
          {
            $set: {
              "reports.$.downVote": `${nowVote}`,
            },
          },
          { new: true, useFindAndModify: false }
        );
        res.status(200).json(vote);
      } else {
        throw { name: "ReportNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  // ! DINAS REPORT
  static async dinasGetAllReports(req, res, next) {
    const { id, email, role } = req.user;
    const { status, category } = req.query;
    try {
      if (status) {
        const allReports = await Report.find({ dinas: id, status })
          .populate("dinas")
          .populate("user")
          .populate("category");
        res.status(200).json(allReports);
      } else if (category) {
        const allReports = await Report.find({ dinas: id, category })
          .populate("dinas")
          .populate("user")
          .populate("category");
        res.status(200).json(allReports);
      } else {
        const allReports = await Report.find({ dinas: id })
          .populate("dinas")
          .populate("user")
          .populate("category");
        res.status(200).json(allReports);
      }
    } catch (err) {
      next(err);
    }
  }

  static async dinasGetByIdReport(req, res, next) {
    const { id } = req.params;
    try {
      const foundReport = await Report.findOne({ _id: id })
        .populate("dinas")
        .populate("user")
        .populate("category");
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
      dinas: req.user.id,
      finishedDate,
    };
    try {
      const foundReport = await Report.findOne({ _id: id });
      if (foundReport) {
        payload.user = foundReport.user;
        payload.title = foundReport.title;
        await Report.updateOne({ _id: id }, payload, {
          change: "ChangeStatus",
        });
        const updatedReport = await Report.findOne({ _id: id });

        await Dinas.updateOne(
          {
            "reports._id": ObjectId(req.params.id),
          },
          {
            $set: {
              "reports.$.status": `${payload.status}`,
              "reports.$.finishedDate": `${payload.finishedDate}`,
            },
          },
          { new: true, useFindAndModify: false }
        );
        await User.updateOne(
          {
            "reports._id": ObjectId(req.params.id),
          },
          {
            $set: {
              "reports.$.status": `${payload.status}`,
              "reports.$.finishedDate": `${payload.finishedDate}`,
            },
          },
          { new: true, useFindAndModify: false }
        );
        await Categories.updateOne(
          {
            "reports._id": ObjectId(req.params.id),
          },
          {
            $set: {
              "reports.$.status": `${payload.status}`,
              "reports.$.finishedDate": `${payload.finishedDate}`,
            },
          },
          { new: true, useFindAndModify: false }
        );

        res.status(200).json(updatedReport);
      } else {
        throw { name: "ReportNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async dinasDeleteReport(req, res, next) {
    const { id } = req.params;
    try {
      const foundReport = await Report.findOneAndDelete({ _id: id });
      if (foundReport) {
        await Dinas.updateOne(
          {
            _id: foundReport.dinas,
          },
          {
            $pull: {
              reports: {
                _id: ObjectId(id),
              },
            },
          }
        );
        await User.updateOne(
          {
            _id: foundReport.user,
          },
          {
            $pull: {
              reports: {
                _id: ObjectId(id),
              },
            },
          }
        );
        await Categories.updateOne(
          {
            _id: foundReport.category,
          },
          {
            $pull: {
              reports: {
                _id: ObjectId(id),
              },
            },
          }
        );
        res.status(200).json(foundReport);
      } else {
        throw { name: "ReportNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ReportController;
