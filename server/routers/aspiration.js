const router = require("express").Router();
const AspirationController = require("../controllers/aspirationController");
const { Userauth } = require("../middlewares/auth");

router.use(Userauth);

router.get("/", AspirationController.getAll);

router.get("/:id", AspirationController.getById);

router.post("/", AspirationController.create);

module.exports = router;
