const db = require("../config/dbconfig");

// Get all books
exports.getAllBooks = async (request, response) => {
  // db.query(`select * from bookstall.books`, (err, res) => {
  //   if (err) {
  //     response.status(500).json(err);
  //   }
  //   response.status(res.statusCode).json(res.data);
  // });

  try {
    const res = await db.searchByValue({
      table: "books",
      searchAttribute: "id",
      searchValue: "*",
      attributes: ["*"],
    });
    response.status(res.statusCode).json(res.data);
  } catch (err) {
    response.status(500).json(err);
  }
};

// Getting a book details by its id
exports.getById = (request, response) => {
  db.query(
    `select * from bookstall.books where id="${request.params.id}"`,
    (err, res) => {
      if (err) response.status(500).json(err);
      response.status(res.statusCode).json(res.data[0]);
    }
  );
};

exports.createBook = (request, response) => {
  const { body } = request;

  db.insert(
    {
      operation: "insert",
      schema: "bookstall",
      table: "books",
      records: [body],
    },
    (err, res) => {
      if (err) response.status(500).json(err);
      response.status(res.statusCode).json(res.data);
    }
  );
};

exports.bulkCreateBooks = (request, response) => {
  const { body } = request;

  db.insert(
    {
      operation: "insert",
      schema: "bookstall",
      table: "books",
      records: body,
    },
    (err, res) => {
      if (err) response.status(500).json(err);
      response.status(res.statusCode).json(res.data);
    }
  );
};
