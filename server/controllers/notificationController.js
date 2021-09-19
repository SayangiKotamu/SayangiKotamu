const Notification = require("../models/notification");

class NotificationController {
  static async getAll(req, res, next) {
    const { id } = req.user;
    try {
      const getNotifications = await Notification.find({ user: id });
      res.status(200).json(getNotifications);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = NotificationController;
