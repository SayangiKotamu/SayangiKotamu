const router = require("express").Router();
const DinasController = require("../../controllers/dinasController");
const reportDinasRouters = require("./report");
const announcmentRouters = require("./announcment");
const { dinasAuth } = require("../../middlewares/auth");

router.post("/register", DinasController.register);

router.post("/login", DinasController.login);

router.use("/reports", dinasAuth, reportDinasRouters);

router.use("/announcments", dinasAuth, announcmentRouters);

module.exports = router;
