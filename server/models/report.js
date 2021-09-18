const { getDatabase } = require("../config/mongoose");
const { ObjectId } = require("bson");

class ReportUser {
  static findAll() {
    return getDatabase().collection("ReportUser").find().toArray();
  }

  static async findByCategory(category) {
    try {
      let data = await getDatabase()
        .collection("ReportUser")
        .findOne({ category: category });
      return data;
    } catch (error) {
      return {
        name: "Not Found",
        message: error,
      };
    }
  }

  static addReport(payload) {
    return getDatabase().collection("ReportUser").insertOne(payload);
  }

  static editReport(payload, id) {
    return getDatabase()
      .collection("ReportUser")
      .updateOne(
        {
          _id: ObjectId(id),
        },
        {
          $set: payload,
        }
      );
  }

  static deleteReport(id) {
    return getDatabase()
      .collection("ReportUser")
      .deleteOne({ _id: ObjectId(id) });
  }

  static deleteDbReport() {
    return getDatabase().collection("ReportUser").drop();
  }
}

module.exports = ReportUser;
