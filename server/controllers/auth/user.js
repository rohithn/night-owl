const User = require("../../models/user.model");
const config = require("../../config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { NotFoundError } = require("../../helpers/utility");

exports.register = async (req, res) => {
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hasPassword = await bcrypt.hash(req.body.password, salt);

  // Create an user object
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    password: hasPassword,
  });

  // Save User in the database
  try {
    const id = await User.create(user);
    if (id) {
      delete user.password;
      res.send(user);
    } else {
      res.status(409).send({ message: "User with email exists" });
    }
  } catch (err) {
    res.status(500).send({ message: JSON.stringify(obj) });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    // Check user exist
    const user = await User.login(req.body.email);
    if (user) {
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send("Email or Password is wrong");

      userDetails = {
        email: user.email,
        name: user.name,
        roles: user.roles,
      };

      // Create and assign token
      const token = jwt.sign(userDetails, config.TOKEN_SECRET);
      res.header("auth-token", token).send({ ...userDetails, token });
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(401).send(`Email or Password is wrong`);
    } else {
      console.log(err);
      let error_data = {
        entity: "User",
        model_obj: { param: req.params, body: req.body },
        error_obj: err,
        error_msg: err.message,
      };
      res.status(500).send("Error retrieving User");
    }
  }
};
