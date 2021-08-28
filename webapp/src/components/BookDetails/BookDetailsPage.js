import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { Rating, RatingView } from "react-simple-star-rating";
import {
  fetchBookDetails,
  fetchBooksByCategories,
} from "../../services/book.service";
import { saveRating } from "../../services/ratings.service";
import BookCard from "../BookList/BookCard";
import "./bookDetails.css";

const BookDetailsPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [bookDetails, setBookDetails] = useState();
  const [rating, setRating] = useState();

  const [bookInCategory, setBookInCategory] = useState([]);

  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const bookDetailsData = await fetchBookDetails(params.id);

      setBookDetails(bookDetailsData);

      const recommendedBooksJson = await fetchBooksByCategories([
        bookDetailsData.category_id,
      ]);
      setBookInCategory(
        // Remove current book
        recommendedBooksJson.filter((b) => b.id !== bookDetailsData.id)
      );
      setLoading(false);
    }
    fetchData();
  }, [params.id]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const onSaveRating = async () => {
    setLoading(true);
    if (rating) {
      try {
        await saveRating(bookDetails.id, rating);
        setBookDetails({ ...bookDetails, rating });
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="loader" hidden={!loading} />
        {bookDetails && (
          <div className="book-details row d-flex gap-4 justify-content-center pt-5">
            <div className="book-details-cover d-flex flex-column col-md-4">
              <img
                className="book-content-cover-image"
                src={bookDetails.cover}
                alt={bookDetails.title}
              />
              <button className="btn-default btn-block my-3">
                Go to Website
              </button>
            </div>
            <div className="book-details-content col-md-6">
              <h2 className="content-title">{bookDetails.title}</h2>
              <div className="content-author">
                by <strong>{bookDetails.author}</strong>
              </div>
              <div
                className="content-rating my-2"
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
            <div className="book-details-recommendations col-md-12">
              {bookInCategory.length > 0 ? (
                <>
                  <hr />
                  <h4 className="m-4 list-heading-title">Similar Books</h4>
                  <div className="d-flex gap-4 scrolls">
                    {bookInCategory.map((bookRec) => (
                      <div key={bookRec.id} className="list-book">
                        <BookCard
                          book={bookRec}
                          onSelect={() =>
                            history.push(`/bookdetails/${bookRec.id}`)
                          }
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
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
                  ratingValue={rating}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={onSaveRating}
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
    </>
  );
};

export default BookDetailsPage;
