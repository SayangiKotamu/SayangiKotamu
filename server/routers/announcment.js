const router = require("express").Router();
const AnnouncmentController = require("../controllers/announcmentController");
const { Userauth } = require("../middlewares/auth");

router.use(Userauth);

router.get("/", AnnouncmentController.getAll);
module.exports = router;
