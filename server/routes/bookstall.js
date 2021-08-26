const bookstall = require("express").Router();
const bookscontroller = require("../controllers/books");
const categoriesController = require("../controllers/category");
const ratingsController = require("../controllers/ratings");

// Get All books
bookstall.get("/books", bookscontroller.getAllBooks);

// Get Book details passing id as parameter
bookstall.get("/books/:id", bookscontroller.getById);

// Create Book
bookstall.post("/books", bookscontroller.createBook);

// Bulk create books
bookstall.post("/books/bulk", bookscontroller.bulkCreateBooks);

bookstall.get("/categories", categoriesController.getAllCategories);

bookstall.post("/categories", categoriesController.createCategory);

bookstall.post("/categories/bulk", categoriesController.bulkCreateCategories);

bookstall.get("/ratings", ratingsController.getAllRatings);

bookstall.post("/ratings", ratingsController.addRating);

module.exports = bookstall;
