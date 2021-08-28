import React, { useEffect, useState } from "react";
import { BOOK_LIST_API_URL, CATEGORIES_API_URL } from "../../constants";
import BookCard from "../BookList/BookCard";
import BookListPage from "../BookList/BookListPage";
import "./dashboard.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [topBooks, setTopBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const categoriesRes = await fetch(CATEGORIES_API_URL);
      const categoriesJson = await categoriesRes.json();
      setCategories(categoriesJson);

      const topBooksRes = await fetch(
        `${BOOK_LIST_API_URL}?sortBy=rating&sortOrder=desc&limit=10`
      );
      const topBooksJson = await topBooksRes.json();

      setTopBooks(topBooksJson || []);
      setLoading(false);
    }

    fetchCategories();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader" />
      ) : (
        <>
          <BookListPage />
        </>
      )}
    </>
  );
};

export default Dashboard;
