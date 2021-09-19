const routers = require("express").Router();
const userRouters = require("./user");
const reportUserRouters = require("./reportUser");
const dinasRouters = require("./dinas/dinas");
const aspirationRouters = require("./aspiration");
const notificationsRouters = require("./notifications");

routers.use("/", userRouters);
routers.use("/reportUser", reportUserRouters);
routers.use("/dinas", dinasRouters);
routers.use("/aspirations", aspirationRouters);
routers.use("/notifications", notificationsRouters);

module.exports = routers;
