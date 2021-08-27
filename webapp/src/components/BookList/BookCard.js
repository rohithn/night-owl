import React from "react";
import { useHistory } from "react-router-dom";
import { RatingView } from "react-simple-star-rating";

const BookCard = ({ book, onSelect }) => {
  return (
    <div className="book" onClick={onSelect}>
      <div className="bookContent">
        <div className="book-cover">
          <img
            className="book-cover-img"
            src={
              book.cover ||
              "https://images-na.ssl-images-amazon.com/images/I/51FNoGECQvL.jpg"
            }
            alt={book.title}
          ></img>
        </div>
        <h2 className="book-title">{book.title || "Awesome Book"}</h2>
        <p className="book-author">
          by <strong>{book.author || "Author Conan Doyle"}</strong>
        </p>
        <p className="book-rating">
          {/* Rating: {book.rating ? <strong>{book.rating} / 5</strong> : "-"} */}
          <RatingView
            ratingValue={book.rating || 0}
            size={18}
            emptyColor="#333333"
          />
        </p>
        <span className="book-category">{book.category || "Category"}</span>
      </div>
    </div>
  );
};

export default BookCard;
