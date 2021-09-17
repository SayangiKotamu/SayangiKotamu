const DinasController = require("../controllers/dinasController");

const router = require("express").Router();

router.post("/", DinasController.register);

router.post("/login", DinasController.login);

module.exports = router;
