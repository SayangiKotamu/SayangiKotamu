const routers = require("express").Router();
const ReportController = require("../controllers/reportController");
const {Userauth} = require("../middlewares/auth")

routers.get("/", ReportController.showAll);
routers.get("/:category", ReportController.showByCategory);
routers.post("/", Userauth, ReportController.addReport);
routers.put("/",Userauth, ReportController.patchVoteByIdReport);
routers.delete("/:id",Userauth, ReportController.deleteReport);

module.exports = routers;
