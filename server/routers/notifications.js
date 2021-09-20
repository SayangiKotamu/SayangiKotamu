const router = require("express").Router();
const NotificationController = require("../controllers/notificationController");
const { Userauth } = require("../middlewares/auth");

router.use(Userauth);
router.get("/", NotificationController.getAll);

module.exports = router;
