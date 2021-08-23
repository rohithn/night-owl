import React, { useEffect, useState } from "react";
import { BOOK_LIST_API_URL } from "../constants";
import { useHistory } from "react-router";

const BookListPage = () => {
  const [bookList, updateBookList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const bookListResponse = await fetch(BOOK_LIST_API_URL);
      const bookListJsonData = await bookListResponse.json();
      updateBookList(bookListJsonData);
    }

    fetchData();
  }, []);

  return (
    <div className="list-book">
      {!bookList.length ? (
        <div className="loader" />
      ) : (
        bookList.map((book) => (
          <div
            key={book.id}
            className="book"
            onClick={() => history.push(`/bookdetails/${book.id}`)}
          >
            <div className="bookContent">
              <div className="book-cover">
                <img
                  className="book-cover-img"
                  src={book.cover}
                  alt={book.title}
                ></img>
              </div>
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">
                by <strong>{book.author}</strong>
              </p>
              <p className="book-rating">
                Rating: <strong>{book.rating} / 5</strong>
              </p>
              <span className="book-category">Fiction</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BookListPage;
