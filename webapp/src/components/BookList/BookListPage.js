import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchAllBooks } from "../../services/book.service";
import { fetchAllCategories } from "../../services/categories.service";
import BookCard from "./BookCard";
import "./bookList.css";
import ListHeading from "./ListHeading";

const BookListPage = () => {
  const history = useHistory();
  const [bookList, setBookList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSortDescending, setIsSortDescending] = useState(false);

  useEffect(() => {
    async function getCategoryData() {
      setLoading(true);

      // Get category list
      const categoriesJson = await fetchAllCategories();
      setCategories(categoriesJson);

      // Create initial list for category filter
      setSelectedCategories(categoriesJson.map((c) => c.id));
      setLoading(false);
    }

    getCategoryData();
  }, []);

  useEffect(() => {
    async function getBookData(cat) {
      setLoading(true);
      let bookListJsonData = [];
      if (isSortDescending) {
        bookListJsonData = await fetchAllBooks("rating", true);
      } else {
        bookListJsonData = await fetchAllBooks("b.__createdtime__", true);
      }
      setBookList(bookListJsonData || []);
      setLoading(false);
    }

    if (selectedCategories.length > 0) {
      getBookData(selectedCategories);
    }
  }, [selectedCategories, isSortDescending]);

  const handleSort = () => {
    setIsSortDescending(!isSortDescending);
  };

  // Not used now
  const handleSelectionChange = (selection) => {
    setSelectedCategories(selection);
  };

  return (
    <div className="book-list-page">
      {loading ? <div className="loader" /> : <></>}
      <div className="list-book">
        <ListHeading
          heading="Library"
          allCategories={categories}
          selectedCategories={selectedCategories}
          sortSelected={isSortDescending}
          onSort={handleSort}
        />
        {bookList.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onSelect={() => history.push(`/bookdetails/${book.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookListPage;
