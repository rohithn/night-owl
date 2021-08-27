import React, { useEffect, useState } from "react";
import { BOOK_LIST_API_URL, CATEGORIES_API_URL } from "../../constants";
import "./bookList.css";
import ListHeading from "./ListHeading";
import BookCard from "./BookCard";
import { useHistory } from "react-router-dom";

const BookListPage = () => {
  const history = useHistory();
  const [bookList, setBookList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSortDescending, setIsSortDescending] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const categoriesRes = await fetch(CATEGORIES_API_URL);
      const categoriesJson = await categoriesRes.json();

      setCategories(categoriesJson);
      setSelectedCategories(categoriesJson.map((c) => c.id));

      setLoading(false);
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchBooks(cat) {
      setLoading(true);
      const bookListResponse = await fetch(
        `${BOOK_LIST_API_URL}?categories=${cat.join(
          ","
        )}&sortBy=rating&sortOrder=${isSortDescending ? "desc" : "asc"}`
      );
      const bookListJsonData = await bookListResponse.json();

      setBookList(bookListJsonData || []);
      setLoading(false);
    }

    if (selectedCategories.length > 0) {
      fetchBooks(selectedCategories);
    }
  }, [selectedCategories, isSortDescending]);

  const handleSort = () => {
    setIsSortDescending(!isSortDescending);
  };

  const handleSelectionChange = (selection) => {
    setSelectedCategories(selection);
  };

  return (
    <div className="book-list-page">
      {loading ? (
        <div className="loader" />
      ) : (
        <div className="list-book">
          <ListHeading
            heading="Library"
            allCategories={categories}
            selectedCategories={selectedCategories}
            handleSort={handleSort}
            handleSelectionChange={handleSelectionChange}
          />
          {bookList.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onSelect={() => history.push(`/bookdetails/${book.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookListPage;
