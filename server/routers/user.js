const routers = require("express").Router();
const UserController = require("../controllers/userController");

routers.post("/register", UserController.register);
routers.post("/login", UserController.login);
routers.patch("/activateEmail/:token", UserController.activateEmail);

module.exports = routers;
