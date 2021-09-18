const router = require("express").Router();
const ReportController = require("../../controllers/reportController");

router.get("/", ReportController.dinasGetAllReports);

module.exports = router;
