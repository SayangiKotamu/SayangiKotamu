const router = require("express").Router();
const DinasController = require("../../controllers/dinasController");
const reportDinasRouters = require("./report");
const announcmentRouters = require("./announcment");
const categoriesRouters = require("./categories");
const { dinasAuth } = require("../../middlewares/auth");

router.post("/register", DinasController.register);

router.post("/login", DinasController.login);

router.use("/reports", dinasAuth, reportDinasRouters);

router.get("/", DinasController.showListDinas);
router.use("/announcments", dinasAuth, announcmentRouters);
router.use("/categories", dinasAuth, categoriesRouters);

module.exports = router;
