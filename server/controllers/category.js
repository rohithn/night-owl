const db = require("../config/dbconfig");

// Get all books
exports.getAllCategories = (request, response) => {
  db.query(`select * from bookstall.categories`, (err, res) => {
    if (err) {
      response.status(500).json(err);
    }
    response.status(res.statusCode).json(res.data);
  });
};

exports.createCategory = (request, response) => {
  const { body } = request;

  db.insert(
    {
      operation: "insert",
      schema: "bookstall",
      table: "categories",
      records: [body],
    },
    (err, res) => {
      if (err) response.status(500).json(err);
      response.status(res.statusCode).json(res.data);
    }
  );
};

exports.bulkCreateCategories = (request, response) => {
  const { body } = request;

  db.insert(
    {
      operation: "insert",
      schema: "bookstall",
      table: "categories",
      records: body,
    },
    (err, res) => {
      if (err) response.status(500).json(err);
      response.status(res.statusCode).json(res.data);
    }
  );
};
