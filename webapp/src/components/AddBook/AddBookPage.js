import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BOOK_LIST_API_URL } from "../../constants";
import "./addbook.css";

const AddBook = () => {
  const [bookDetails, updateBookDetails] = useState();

  return (
    <div>
      <div className="book-details">
        <div className="book-details-cover">
          <img className="book-content-cover-image" src="" alt="Book cover" />
        </div>
        <div className="book-details-content">
          <h2 className="content-title">Title</h2>
          <div className="content-author">
            by <strong>Author</strong>
          </div>
          <div className="content-rating">
            Rating: <strong>0 / 5</strong>
          </div>
          <div className="content-category">Category</div>
          <hr />
          <div className="content-isbn">ISBN: Value</div>
          <div className="content-pages">Pages: Value</div>
          <hr />
          <div className="content-desc">Description</div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
