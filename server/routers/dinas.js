const DinasController = require("../controllers/dinasController");

const router = require("express").Router();

router.post("/", DinasController.register);

module.exports = router;
