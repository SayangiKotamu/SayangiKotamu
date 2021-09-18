const DinasController = require("../controllers/dinasController");
const ReportController = require("../controllers/reportController");

const router = require("express").Router();

router.post("/", DinasController.register);

router.post("/login", DinasController.login);

router.get("/reports", ReportController.dinasGetAllReports);

module.exports = router;
