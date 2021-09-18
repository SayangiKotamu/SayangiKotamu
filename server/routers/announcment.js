const router = require("express").Router();
const AnnouncmentController = require("../controllers/announcmentController");

router.get("/", AnnouncmentController);

module.exports = router;
