const router = require("express").Router();
const DinasController = require("../../controllers/dinasController");
const reportDinasRouters = require("./report");
const { dinasAuth } = require("../../middlewares/auth");

router.post("/register", DinasController.register);

router.post("/login", DinasController.login);

router.use("/reports", dinasAuth, reportDinasRouters);

router.get("/", DinasController.showListDinas);

module.exports = router;
