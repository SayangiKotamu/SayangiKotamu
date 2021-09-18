const router = require("express").Router();
const AspirationController = require("../controllers/aspirationController");

router.get("/", AspirationController.getAll);

router.post("/create", AspirationController.create);

module.exports = router;
