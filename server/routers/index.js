const routers = require("express").Router();
const userRouters = require("./user");
const reportUserRouters = require("./reportUser");
const dinasRouters = require("./dinas");

routers.use("/", userRouters);
routers.use("/reportUser", reportUserRouters);
routers.use("/dinas", dinasRouters);

module.exports = routers;
