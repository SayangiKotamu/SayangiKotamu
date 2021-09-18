const router = require("express").Router();
const DinasController = require("../../controllers/dinasController");
const reportDinasRouters = require("./report");
const { auth } = require("../../middlewares/auth");

router.post("/", DinasController.register);

router.post("/login", DinasController.login);

router.use("/reports", auth, reportDinasRouters);

module.exports = router;
