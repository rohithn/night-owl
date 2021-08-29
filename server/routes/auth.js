const auth = require("express").Router();

const userController = require("../controllers/auth/user.controller");

auth.post("/login", userController.login);

auth.post("/register", userController.register);

module.exports = auth;
