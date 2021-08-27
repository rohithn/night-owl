const db = require("../config/dbconfig");

// Get all ratings
exports.getAllRatings = (request, response) => {
  db.query(`select * from bookstall.ratings`, (err, res) => {
    if (err) {
      response.status(500).json(err);
    }
    response.status(res.statusCode).json(res.data);
  });
};

exports.getRatingsByBook = (request, response) => {
  db.query(
    `select * from bookstall.ratings where book_id="${request.params.id}"`,
    (err, res) => {
      if (err) {
        response.status(500).json(err);
      }
      response.status(res.statusCode).json(res.data);
    }
  );
};

exports.addRating = (request, response) => {
  const { body } = request;

  db.upsert(
    {
      operation: "upsert",
      schema: "bookstall",
      table: "ratings",
      records: [
        {
          id: `${body.user_id}+${body.book_id}`,
          book_id: body.book_id,
          user_id: body.user_id,
          rating: body.rating,
        },
      ],
    },
    (err, res) => {
      if (err) response.status(500).json(err);
      response.status(res.statusCode).json(res.data);
    }
  );
};
