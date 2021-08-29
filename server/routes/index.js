const bookstall = require("./bookstall");
const auth = require("./auth");

const router = require("express").Router();

router.use("/api", bookstall);

router.use("/auth", auth);

module.exports = router;
