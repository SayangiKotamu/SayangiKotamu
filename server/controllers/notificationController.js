const Notification = require("../models/notification");

class NotificationController {
  static async getAll(req, res, next) {
    const { id } = req.user;
    try {
      const getNotifications = await Notification.find({ user: id }).sort({
        _id: -1,
      });
      res.status(200).json(getNotifications);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = NotificationController;
