const router = require("express").Router();
const RatingController = require("../../controllers/ratingController");

router.get("/", RatingController.getAll);

router.get("/:id", RatingController.getById);

module.exports = router;
