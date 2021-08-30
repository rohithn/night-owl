const db = require("../config/dbconfig");
const { NotFoundError } = require("../helpers/utility");

// constructor
const User = function (user) {
  this.email = user.email;
  this.name = user.name;
  this.password = user.password;
  this.roles = ["USER"];
};

User.create = async (newUser) => {
  try {
    let insert = await db.insert({
      operation: "insert",
      schema: "bookstall",
      table: "users",
      records: [newUser],
    });
    if (insert.statusCode === 200) {
      return insert.data.inserted_hashes[0];
    } else {
      throw new Error(insert);
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

User.findBy = async (data, field) => {
  let row = await db.query(
    `SELECT * FROM bookstall.users WHERE ${field} = ${data[field]}`
  );

  if (row.length) {
    let user = row[0];
    delete user.password;

    return user;
  } else {
    throw new NotFoundError("User does not exist");
  }
};

User.login = async (value) => {
  const query = `SELECT * FROM bookstall.users WHERE email = "${value}"`;
  let row = await db.query(query);

  if (row.data.length) {
    return row.data[0];
  } else {
    throw new NotFoundError("User does not exist");
  }
};

module.exports = User;
