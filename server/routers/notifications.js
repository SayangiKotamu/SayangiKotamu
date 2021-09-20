const router = require("express").Router();
const NotificationController = require("../controllers/notificationController");
const { Userauth, authEmailUser } = require("../middlewares/auth");

router.use(Userauth, authEmailUser);
router.get("/", NotificationController.getAll);

module.exports = router;
