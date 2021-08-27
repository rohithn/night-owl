import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Rating, RatingView } from "react-simple-star-rating";
import {
  BOOK_LIST_API_URL,
  CATEGORIES_API_URL,
  RATINGS_API_URL,
} from "../../constants";
import "./bookDetails.css";

const BookDetailsPage = () => {
  const [bookDetails, setBookDetails] = useState();
  const [rating, setRating] = useState();

  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const bookDetailsResponse = await fetch(
        BOOK_LIST_API_URL + "/" + params.id
      );
      const bookDetailsJsonData = await bookDetailsResponse.json();

      const categoriesRes = await fetch(CATEGORIES_API_URL);
      const categoriesJson = await categoriesRes.json();

      const ratingsRes = await fetch(
        RATINGS_API_URL + "/" + bookDetailsJsonData.id
      );
      const ratingsJson = await ratingsRes.json();

      const category = categoriesJson.filter(
        (c) => c.id === bookDetailsJsonData.category_id
      );

      bookDetailsJsonData.category = category[0].name;

      if (ratingsJson.length === 0) {
        bookDetailsJsonData.rating = 0;
      } else {
        bookDetailsJsonData.rating =
          ratingsJson.reduce((total, next) => total + next.rating, 0) /
          ratingsJson.length;
      }

      setBookDetails(bookDetailsJsonData);
    }
    fetchData();
  }, [rating]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const saveRating = async () => {
    if (rating) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_id: bookDetails.id,
          user_id: "9c96c5c2-1fdd-42a0-92b3-1edf1c2a0f97",
          rating,
        }),
      };
      try {
        const resp = await fetch(RATINGS_API_URL, requestOptions);
        const respJson = await resp.json();
        console.log(respJson);
      } catch (e) {
        console.log(e);
      }
    }
  };

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
              <div
                className="content-rating"
                data-bs-toggle="modal"
                data-bs-target="#ratingModal"
              >
                <RatingView
                  ratingValue={bookDetails.rating}
                  emptyColor="#333333"
                />
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
      <div
        className="modal ease"
        id="ratingModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Rating
              </h5>
            </div>
            <div className="modal-body">
              <Rating
                className="d-block p-3"
                onClick={handleRating}
                ratingValue={rating} /* Rating Props */
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-warning"
                onClick={saveRating}
                data-bs-dismiss="modal"
                disabled={rating ? false : true}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
