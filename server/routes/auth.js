const auth = require("express").Router();

const userController = require("../controllers/auth/user");

auth.post("/login", userController.login);

auth.post("/register", userController.register);

module.exports = auth;
