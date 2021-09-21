const router = require("express").Router();
const ReportController = require("../../controllers/reportController");
const { authZDinas } = require("../../middlewares/auth");

router.get("/", ReportController.dinasGetAllReports);

router.get("/:id", authZDinas, ReportController.dinasGetByIdReport);

router.patch("/:id", authZDinas, ReportController.changeStatus);

router.delete("/:id", authZDinas, ReportController.dinasDeleteReport);

module.exports = router;
