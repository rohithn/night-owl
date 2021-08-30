const bookstall = require("express").Router();
const bookscontroller = require("../controllers/books");
const categoriesController = require("../controllers/category");
const ratingsController = require("../controllers/ratings");
const { loggedIn, adminOnly } = require("../helpers/auth.middleware");

// Get All books
bookstall.get("/books", bookscontroller.getAllBooks);

bookstall.get("/books/categories", bookscontroller.getBookCountByCategory);

bookstall.get("/books/authors", bookscontroller.getBookCountByAuthor);

// Get Book details passing id as parameter
bookstall.get("/books/:id", loggedIn, bookscontroller.getById);

// Create Book
bookstall.post("/books", loggedIn, adminOnly, bookscontroller.createBook);

// Bulk create books
bookstall.post(
  "/books/bulk",
  loggedIn,
  adminOnly,
  bookscontroller.bulkCreateBooks
);

bookstall.get("/categories", categoriesController.getAllCategories);

bookstall.post(
  "/categories",
  loggedIn,
  adminOnly,
  categoriesController.createCategory
);

bookstall.post(
  "/categories/bulk",
  loggedIn,
  adminOnly,
  categoriesController.bulkCreateCategories
);

bookstall.get("/ratings", ratingsController.getAllRatings);

bookstall.post("/ratings", loggedIn, ratingsController.addRating);

bookstall.get("/ratings/:id", ratingsController.getRatingsByBook);

module.exports = bookstall;
