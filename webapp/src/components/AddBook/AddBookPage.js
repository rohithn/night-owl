import React, { useEffect, useState } from "react";
import { saveBook } from "../../services/book.service";
import { fetchAllCategories } from "../../services/categories.service";
import BookCard from "../BookList/BookCard";
import "./addbook.css";

const AddBook = () => {
  const emptyBook = {
    title: "",
    description: "",
    author: "",
    category_id: "",
    category: "",
    isbn: "",
    pages: 0,
    website: "",
    cover: "",
  };
  const [bookDetails, setBookDetails] = useState({ ...emptyBook });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getCategoryData = async () => {
      const categoriesJson = await fetchAllCategories();
      setCategories(categoriesJson);
    };
    getCategoryData();
  }, []);

  const onCategorySelect = (e) => {
    const { selectedIndex, options, value } = e.target;
    setBookDetails({
      ...bookDetails,
      category_id: value,
      category: options[selectedIndex].text,
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [id]: value,
    });
  };

  const handleDismissAlert = () => {
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitBook();
  };

  const submitBook = async () => {
    if (bookDetails) {
      try {
        await saveBook(bookDetails);
        setMessage("Book added successfully");
        setBookDetails(emptyBook);
      } catch (e) {
        console.log(e);
        setMessage(e.message);
      }
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container">
      <div className="add-book-content row justify-content-center">
        <div className="add-book-alert col-md-10">
          {message ? (
            <div
              className="alert alert-warning alert-dismissible my-2"
              role="alert"
              id="messageAlert"
            >
              {message}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleDismissAlert}
              ></button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="add-book-title col-md-10">
          <div className="py-5 text-center">
            <h2>Add Book</h2>
            <p className="lead">
              Use the form below to add a book to the library. The form is not
              validated currently, so please make sure that all fields are
              filled in correctly.
            </p>
          </div>
        </div>
        <div className="add-book-form col-md-7">
          <form className="needs-validation" noValidate>
            <div className="row g-3">
              <div className="col-sm-12">
                <h4 className="col-md-6">Book Details</h4>
              </div>
              <div className="col-sm-12">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="The Awesome Book"
                  value={bookDetails.title}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Title is required.</div>
              </div>
              <div className="col-sm-12">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="A simple description of what the book is about"
                  value={bookDetails.description}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  A description is required.
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    placeholder="Author"
                    value={bookDetails.author}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="invalid-feedback">Author is required.</div>
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  onChange={onCategorySelect}
                  value={bookDetails.category_id}
                  required
                >
                  <option value="">Choose...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">
                  Please select a valid category.
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="isbn" className="form-label">
                  ISBN
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="isbn"
                  value={bookDetails.isbn}
                  placeholder="9780000000000"
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter a valid ISBN
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="pages" className="form-label">
                  Pages
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pages"
                  value={bookDetails.pages}
                  placeholder={256}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">
                  Please enter the number of pages
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="website" className="form-label">
                  Website
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  value={bookDetails.website}
                  placeholder="https://the-awesome-books.com/read/awesomebook"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  Please enter a valid website
                </div>
              </div>
              <div className="col-12">
                <label htmlFor="cover" className="form-label">
                  Cover Image Url
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cover"
                  value={bookDetails.cover}
                  placeholder="https://the-awesome-books.com/book-image.jpeg"
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">Please enter a valid url</div>
              </div>
            </div>
            <hr className="my-4"></hr>
            <button
              className="w-100 btn-default btn-block mb-5"
              type="submit"
              onClick={handleSubmit}
            >
              <span className="text-uppercase">Add To Library</span>
            </button>
          </form>
        </div>
        <div className="col-md-3">
          <div className="row g-3">
            <div className="col-sm-12">
              <h4 className="col-md-6">Preview</h4>
            </div>
            <div className="d-flex justify-content-center my-5">
              <BookCard book={bookDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
