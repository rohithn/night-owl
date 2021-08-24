import React from "react";
import { useHistory } from "react-router-dom";

const BookCard = ({ book }) => {
  const history = useHistory();
  return (
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
  );
};

export default BookCard;
