const router = require("express").Router();
const AnnouncmentController = require("../controllers/announcmentController");
const { Userauth, authEmailUser } = require("../middlewares/auth");

router.use(Userauth, authEmailUser);

router.get("/", AnnouncmentController.getAll);
module.exports = router;
