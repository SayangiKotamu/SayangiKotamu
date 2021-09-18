const routers = require("express").Router();
const ReportController = require("../controllers/reportController");

routers.get("/", ReportController.showAll);
routers.get("/:category", ReportController.showByCategory);
routers.post("/", ReportController.addReport);
routers.put("/", ReportController.patchVoteByIdReport);
routers.delete("/:id", ReportController.deleteReport);

module.exports = routers;
