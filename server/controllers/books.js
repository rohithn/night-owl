const db = require("../config/dbconfig");
const bookstall = require("../routes/bookstall");

// Get all books
exports.getAllBooks = async (request, response) => {
  try {
    const { author, categories, sortBy, sortOrder, limit } = request.query;

    //let selectQuery = "select * from bookstall.books as b";
    let selectQuery = `select b.id, b.cover, b.title, b.author, c.name category, c.id category_id, avg(r.rating) rating, b.__createdtime__ createdtime 
    from bookstall.books b join bookstall.categories c on b.category_id=c.id 
    left outer join bookstall.ratings r on b.id=r.book_id`;

    if (categories) {
      selectQuery += ` where b.category_id in (${categories
        .split(",")
        .map((c) => `'${c}'`)
        .join(",")})`;
    } else if (author) {
      selectQuery += ` where b.author='${author}'`;
    }

    selectQuery += ` group by b.id, c.name, b.cover, b.title, b.author, c.id, b.__createdtime__`;

    if (sortBy) {
      selectQuery += ` order by ${sortBy} ${sortOrder}`;
    } else {
      selectQuery += ` order by __createdtime__ desc`;
    }

    if (limit) {
      selectQuery += ` limit ${limit}`;
    }

    console.log(selectQuery);

    const { data } = await db.query(selectQuery);

    response.json(data);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
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

  if (!body.title || body.title.length < 3) {
    response.status(400).json({ message: "Title cannot be empty" });
    return;
  }

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

exports.getBookCountByCategory = async (request, response) => {
  try {
    const query = `select c.name, count(c.id) book_count, c.id from bookstall.categories c 
  join bookstall.books b on c.id = b.category_id group by c.name, c.id
  order by book_count desc`;
    const { data } = await db.query(query);
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json(err);
  }
};

exports.getBookCountByAuthor = async (request, response) => {
  try {
    const query = `select author, count(author) book_count from bookstall.books 
    group by author order by book_count desc`;
    const { data } = await db.query(query);
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json(err);
  }
};
