const router = require("express").Router();
const RatingController = require("../controllers/ratingController");
const { Userauth, authEmailUser } = require("../middlewares/auth");

router.use(Userauth, authEmailUser);

router.get("/", RatingController.getAll);

router.post("/", RatingController.create);

module.exports = router;
