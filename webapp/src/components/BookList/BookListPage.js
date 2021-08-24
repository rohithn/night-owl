import React, { useEffect, useState } from "react";
import { BOOK_LIST_API_URL } from "../../constants";
import "./bookList.css";
import ListHeading from "../ListHeading";
import BookCard from "./BookCard";

const BookListPage = () => {
  const [bookList, updateBookList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const bookListResponse = await fetch(BOOK_LIST_API_URL);
      const bookListJsonData = await bookListResponse.json();
      updateBookList(bookListJsonData);
    }

    fetchData();
  }, []);

  return (
    <div className="book-list-page">
      {!bookList.length ? (
        <div className="loader" />
      ) : (
        <div className="list-book">
          <ListHeading heading="All Books" />
          {bookList.map((book) => (
            <BookCard book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookListPage;
