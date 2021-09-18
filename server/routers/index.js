const routers = require("express").Router();
const userRouters = require("./user");
const reportUserRouters = require("./reportUser");
const dinasRouters = require("./dinas/dinas");
const categoriesRouters = require("./categories");

routers.use("/", userRouters);
routers.use("/reportUser", reportUserRouters);
routers.use("/dinas", dinasRouters);
routers.use("/categories", categoriesRouters);

module.exports = routers;
