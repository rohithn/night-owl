import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  fetchBookCountByAuthor,
  fetchBookCountByCategory,
  fetchBooksByAuthor,
  fetchBooksByCategories,
  fetchTopBooks,
} from "../../services/book.service";
import BookCard from "../BookList/BookCard";
import CategoryCard from "./CategoryCard.js/CategoryCard";
import "./dashboard.css";
import SectionHeader from "./SectionHeader";

const Dashboard = (props) => {
  const [loading, setLoading] = useState(false);
  const [topBooks, setTopBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [property, setProperty] = useState("Top Books");

  const history = useHistory();
  let location = useLocation();

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);

      const booksByCategory = await fetchBookCountByCategory();
      setCategories(booksByCategory);

      const booksByAuthor = await fetchBookCountByAuthor();
      setAuthors(booksByAuthor || []);

      setLoading(false);
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    console.log(location.search);

    async function fetchData() {
      const author = new URLSearchParams(location.search).get("author");
      const category = new URLSearchParams(location.search).get("category");

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
    }
    fetchData();
  }, [location]);

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
                  onClick={() => history.push("/allbooks")}
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
              <SectionHeader heading="Top Authors" />
              {authors.map((author) => (
                <CategoryCard
                  key={author.author}
                  item={author.author}
                  count={author.book_count}
                  onSelect={() => history.push(`/?author=${author.author}`)}
                />
              ))}
              <SectionHeader heading="All Categories" />
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  item={category.name}
                  count={category.book_count}
                  onSelect={() => history.push(`/?category=${category.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
