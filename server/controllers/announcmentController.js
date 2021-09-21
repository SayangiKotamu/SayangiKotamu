const { ObjectId } = require("bson");

const Announcment = require("../models/announcment");
const Dinas = require("../models/dinas");

class AnnouncmentController {
  static async create(req, res, next) {
    const { id } = req.user;
    const payload = {
      title: req.body.title,
      announcment: req.body.announcment,
      date: new Date(),
      dinas: id,
    };
    try {
      const createAnnouncment = await Announcment.create(payload);
      await Dinas.findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            announcments: { _id: createAnnouncment._id, ...payload },
          },
        },
        { new: true, useFindAndModify: false }
      );
      const foundAnnouncment = await Announcment.findOne({
        _id: createAnnouncment._id,
      }).populate("dinas");
      res.status(201).json(foundAnnouncment);
    } catch (err) {
      const toArray = Object.values(err.errors);
      const errMessage = toArray.map((el) => {
        return el.message;
      });
      res.status(400).json({ message: errMessage });
    }
  }

  static async getAll(req, res, next) {
    const { id, role } = req.user;
    try {
      if (role !== "dinas") {
        const getAllAnnouncments = await Announcment.find().populate("dinas");
        res.status(200).json(getAllAnnouncments);
      } else {
        const getAllAnnouncments = await Announcment.find({
          dinas: id,
        }).populate("dinas");
        res.status(200).json(getAllAnnouncments);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    const { id } = req.params;
    try {
      const getAllAnnouncment = await Announcment.findOne({ _id: id }).populate(
        "dinas"
      );
      if (getAllAnnouncment) {
        res.status(200).json(getAllAnnouncment);
      } else {
        throw { name: "AnnouncmentNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async edit(req, res, next) {
    const payload = {
      title: req.body.title,
      announcment: req.body.announcment,
      date: new Date(),
    };
    const { id } = req.params;

    try {
      const editAnnouncment = await Announcment.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true, useFindAndModify: false }
      ).populate("dinas");

      if (editAnnouncment) {
        await Dinas.updateOne(
          {
            "announcments._id": ObjectId(id),
          },
          {
            $set: {
              "announcments.$.title": `${payload.title}`,
              "announcments.$.announcment": `${payload.announcment}`,
            },
          },
          { new: true, useFindAndModify: false }
        );
        res.status(200).json(editAnnouncment);
      } else {
        throw { name: "AnnouncmentNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    const { id: userId } = req.user;

    try {
      const deleteAnnouncment = await Announcment.findByIdAndDelete({
        _id: id,
      });
      if (deleteAnnouncment) {
        await Dinas.updateOne(
          {
            _id: userId,
          },
          {
            $pull: {
              announcments: {
                _id: ObjectId(id),
              },
            },
          }
        );
        res.status(200).json(deleteAnnouncment);
      } else {
        throw { name: "AnnouncmentNotFound" };
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = AnnouncmentController;
