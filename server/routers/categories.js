const routers = require("express").Router();
const categoriesController = require("../controllers/categoriesController");

routers.get("/", categoriesController.showAll);
routers.post("/", categoriesController.addCategories);
routers.put("/:id", categoriesController.editCategories);
routers.delete("/:id", categoriesController.deleteCategories);

module.exports = routers;
