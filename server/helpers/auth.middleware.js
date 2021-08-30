const config = require("../config/config");
const jwt = require("jsonwebtoken");

// Auth middleware for verifying token

// Login method - creates a JWT token that can be used for queries
exports.loggedIn = function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, config.TOKEN_SECRET);
    if (verified.user_type_id === "USER") {
      // Check authorization, 2 = Customer, 1 = Admin
      let req_url = req.baseUrl + req.route.path;
      if (
        req_url.includes("users/:id") &&
        parseInt(req.params.id) !== verified.id
      ) {
        return res.status(401).send("Unauthorized!");
      }
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

exports.adminOnly = async function (req, res, next) {
  if (req.user.role === "USER") {
    return res.status(401).send("Unauthorized!");
  }
  next();
};
