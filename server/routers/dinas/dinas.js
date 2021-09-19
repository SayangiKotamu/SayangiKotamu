const router = require("express").Router();
const DinasController = require("../../controllers/dinasController");
const reportDinasRouters = require("./report");
const announcmentRouters = require("./announcment");
const categoriesRouters = require("./categories");
const aspirationRouters = require("./aspirations");
const { dinasAuth } = require("../../middlewares/auth");

router.post("/register", DinasController.register);

router.post("/login", DinasController.login);

router.get("/", DinasController.showListDinas);

router.use("/reports", dinasAuth, reportDinasRouters);
router.use("/announcments", dinasAuth, announcmentRouters);
router.use("/categories", dinasAuth, categoriesRouters);
router.use("/aspirations", dinasAuth, aspirationRouters);

module.exports = router;
