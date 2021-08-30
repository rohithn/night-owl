const Book = require("../models/books.model");

// Get all books
exports.getAllBooks = async (request, response) => {
  try {
    const { title, author, categories, sortBy, sortOrder, limit } =
      request.query;
    const data = await Book.find(
      title,
      categories,
      author,
      sortBy,
      sortOrder,
      limit
    );
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
};

// Getting a book details by its id
exports.getById = async (request, response) => {
  const id = request.params.id;
  try {
    const book = await Book.findBy("id", id);
    response.status(200).json(book[0]);
  } catch (err) {
    response.status(500).json(err);
  }
};

exports.createBook = async (request, response) => {
  const { body } = request;

  if (!body.title || body.title.length < 3) {
    response.status(400).json({ message: "Title cannot be empty" });
    return;
  }
  try {
    const book = await Book.create(body);
    response.status(201).json(book);
  } catch (err) {
    response.status(500).json(err);
  }
};

exports.bulkCreateBooks = async (request, response) => {
  const { body } = request;
  try {
    const books = await Book.bulkCreate(body);
    response.status(res.statusCode).json(books);
  } catch (err) {
    response.status(500).json(err);
  }
};

exports.getBookCountByCategory = async (request, response) => {
  try {
    const data = await Book.getBookCountByCategory();
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json(err);
  }
};

exports.getBookCountByAuthor = async (request, response) => {
  try {
    const data = await Book.getBookCountByAuthor();
    response.status(200).json(data);
  } catch (err) {
    response.status(500).json(err);
  }
};
