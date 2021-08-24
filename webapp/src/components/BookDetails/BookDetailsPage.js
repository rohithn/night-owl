import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BOOK_LIST_API_URL } from "../../constants";
import "./bookDetails.css"

const BookDetailsPage = () => {
  const [bookDetails, updateBookDetails] = useState();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const bookDetailsResponse = await fetch(
        BOOK_LIST_API_URL + "/" + params.id
      );
      const bookDetailsJsonData = await bookDetailsResponse.json();
      updateBookDetails(bookDetailsJsonData);
    }
    fetchData();
  }, []);

  return (
    <div>
      {!bookDetails ? (
        <div className="loader" />
      ) : (
        bookDetails && (
          <div className="book-details">
            <div className="book-details-cover">
              <img
                className="book-content-cover-image"
                src={bookDetails.cover}
                alt={bookDetails.title}
              />
              <button className="btn-default btn-block">Go to Website</button>
            </div>
            <div className="book-details-content">
              <h2 className="content-title">{bookDetails.title}</h2>
              <div className="content-author">
                by <strong>{bookDetails.author}</strong>
              </div>
              <div className="content-rating">
                Rating: <strong>{bookDetails.rating} / 5</strong>
              </div>
              <div className="content-category">{bookDetails.category}</div>
              <hr />
              <div className="content-isbn">ISBN: {bookDetails.isbn}</div>
              <div className="content-pages">Pages: {bookDetails.pages}</div>
              <hr />
              <div className="content-desc">{bookDetails.description}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default BookDetailsPage;
