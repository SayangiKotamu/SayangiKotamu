const routers = require("express").Router();
const userRouters = require("./user");
const reportUserRouters = require("./reportUser");
const dinasRouters = require("./dinas/dinas");
const categoriesRouters = require("./categories");
const aspirationRouters = require("./aspiration");

routers.use("/", userRouters);
routers.use("/reportUser", reportUserRouters);
routers.use("/dinas", dinasRouters);
routers.use("/categories", categoriesRouters);
routers.use("/aspirations", aspirationRouters);

module.exports = routers;
