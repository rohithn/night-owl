import React from "react";
import { useHistory } from "react-router-dom";
import { RatingView } from "react-simple-star-rating";

const BookCard = ({ book }) => {
  const history = useHistory();
  return (
    <div
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
          {/* Rating: {book.rating ? <strong>{book.rating} / 5</strong> : "-"} */}
          <RatingView
            ratingValue={book.rating}
            size={18}
            emptyColor="#333333"
          />
        </p>
        <span className="book-category">{book.category}</span>
      </div>
    </div>
  );
};

export default BookCard;
