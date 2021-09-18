const routers = require("express").Router();
const ReportController = require("../controllers/reportController");
const {Userauth} = require("../middlewares/auth")

routers.get("/", ReportController.showAll);
routers.get("/:category", ReportController.showByCategory);
routers.post("/", Userauth, ReportController.addReport);
routers.patch("/up/:id", Userauth, ReportController.upVoteByIdReport);
routers.patch("/down/:id", Userauth, ReportController.downVoteByIdReport);
routers.patch("/status/:id", Userauth, ReportController.patchStatusReport);
routers.delete("/:id",Userauth, ReportController.deleteReport);

module.exports = routers;
