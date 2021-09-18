const Categories = require("../models/categories");
const Report = require("../models/report");
const Dinas = require("../models/dinas")

class ReportController {
  // ! USER REPORT
  static async showAll(req, res, next) {
    try {
      let data = await Report.find();
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
        user: req.user.id,
        status: "diterima",
        description: req.body.description,
        issuedDate: new Date(),
        location: req.body.location,
        lat: +req.body.lat,
        long: +req.body.long,
        picture: req.body.picture,
        upVote:0,
        downVote:0
      };
      let categories = await Categories.findOne({_id:req.body.category})
      newReport.category = categories
      let dinas = await Dinas.findOne({_id:req.body.dinas})
      newReport.dinas = dinas
      let data = await Report.create(newReport);
      res.status(201).json({ ...newReport, _id: data.insertedId });
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async upVoteByIdReport(req, res, next) {
    //cek user dulu udah pernah vote belum yg ini belum di handle
    try {
      let data = await Report.findOne({_id:req.params.id})
      if (data) {
        let nowVote = data.upVote+1
        let vote = await Report.updateOne({_id:req.params.id},{upVote:nowVote})
        res.status(201).json(vote)
      }else{
          next({
              name:"NotFound",
              message:"report Not Found"
          })
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async downVoteByIdReport(req, res, next) {
    //cek user dulu udah pernah vote belum
    try {
      let data = await Report.findOne({_id:req.params.id})
      if (data) {
        let nowVote = data.downVote+1
        let vote = await Report.updateOne({_id:req.params.id},{downVote:nowVote})
        res.status(201).json(vote)
      }else{
          next({
              name:"NotFound",
              message:"report Not Found"
          })
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async patchStatusReport(req, res, next) {
    try {
      let data = await Report.findOne({_id:req.params.id})
      if (data) {
        let nowStatus = data.status
        if (nowStatus === "diterima") {
          nowStatus = "diproses"
        } else if (nowStatus === "diproses"){
          nowStatus = "selesai"
        }
        let status = await Report.updateOne({_id:req.params.id},{status:nowStatus})
        res.status(201).json(status)
      }else{
          next({
              name:"NotFound",
              message:"report Not Found"
          })
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async deleteReport(req, res, next) {
    try{
      let data = await Report.findOneAndDelete({_id:req.params.id})
      if (data) {
          res.status(201).json(data)
      } else {
          next({
              name:"NotFound",
              message:"Report Not Found"
          })
      }
    } catch(err){
        next(err)
    }
  }

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
