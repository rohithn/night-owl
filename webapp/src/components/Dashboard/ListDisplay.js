import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  fetchBooksByAuthor,
  fetchBooksByCategories,
  fetchTopBooks,
} from "../../services/book.service";
import { fetchAllCategories } from "../../services/categories.service";
import BookCard from "../BookList/BookCard";
import "./dashboard.css";
import SectionHeader from "./SectionHeader";

const ListDisplay = () => {
  const [loading, setLoading] = useState(false);
  const [topBooks, setTopBooks] = useState([]);
  const [property, setProperty] = useState("Top Books");

  const history = useHistory();
  let location = useLocation();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const author = new URLSearchParams(location.search).get("author");
      const category = new URLSearchParams(location.search).get("category");

      const categories = await fetchAllCategories();

      let bookList = [];
      if (author) {
        bookList = await fetchBooksByAuthor(author);
        setProperty(`Books by ${author}`);
      } else if (category) {
        bookList = await fetchBooksByCategories([category]);
        setProperty(
          `Books in ${categories.filter((c) => c.id === category)[0].name}`
        );
      } else {
        bookList = await fetchTopBooks();
        setProperty(`Top 10 Books`);
      }
      setTopBooks(bookList);
      window.scroll(0, 0);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader" />
      ) : (
        <div className="book-list-page">
          {loading ? (
            <div className="loader" />
          ) : (
            <div className="list-book">
              <SectionHeader heading={property}>
                <div
                  className="text-warning text-uppercase cursor-pointer"
                  onClick={() => history.push("/")}
                >
                  View All
                </div>
              </SectionHeader>
              {topBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onSelect={() => history.push(`/bookdetails/${book.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ListDisplay;
