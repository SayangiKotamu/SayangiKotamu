const router = require("express").Router();
const ReportController = require("../../controllers/reportController");

router.get("/", ReportController.dinasGetAllReports);

router.get("/:id", ReportController.dinasGetByIdReport);

router.patch("/:id", ReportController.changeStatus);

router.delete("/:id", ReportController.dinasDeleteReport);

// router.get("/:category", ReportController.dinasGetByCategoryReport);

// router.get("/:status", ReportController.dinasGetByStatusReport);

module.exports = router;
