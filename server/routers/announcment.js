const router = require("express").Router();
const AnnouncmentController = require("../controllers/announcmentController");
const { Userauth, authEmailUser } = require("../middlewares/auth");

router.use(Userauth, authEmailUser);

router.get("/", AnnouncmentController.getAll);
router.get("/:id", AnnouncmentController.getById);

module.exports = router;
