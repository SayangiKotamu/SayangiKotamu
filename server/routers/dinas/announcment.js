const router = require("express").Router();
const AnnouncmentController = require("../../controllers/announcmentController");

router.get("/", AnnouncmentController.getAll);

router.get("/:id", AnnouncmentController.getById);

router.post("/", AnnouncmentController.create);

router.put("/:id", AnnouncmentController.edit);

router.delete("/:id", AnnouncmentController.delete);

module.exports = router;
