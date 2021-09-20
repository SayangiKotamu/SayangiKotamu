const routers = require("express").Router();
const ReportController = require("../controllers/reportController");
const { Userauth } = require("../middlewares/auth");

routers.get("/", Userauth, ReportController.showAll);
routers.get("/:category", Userauth, ReportController.showByCategory);
routers.post("/", Userauth, ReportController.addReport);
routers.patch("/up/:id", Userauth, ReportController.upVoteByIdReport);
routers.patch("/down/:id", Userauth, ReportController.downVoteByIdReport);

module.exports = routers;
