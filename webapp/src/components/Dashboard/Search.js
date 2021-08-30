import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { fetchBooksByTitle } from "../../services/book.service";
import BookCard from "../BookList/BookCard";
import "./dashboard.css";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const history = useHistory();

  useEffect(() => {
    async function fetchData(string) {
      setLoading(true);
      const bookList = await fetchBooksByTitle(string);
      setBooks(bookList.filter((b) => b.id !== null));
      setLoading(false);
    }

    if (search.length >= 3) {
      fetchData(search);
    }
  }, [search]);

  return (
    <>
      {loading ? <div className="loader" /> : <></>}
      <div className="book-list-page">
        <div className="list-book">
          <div className="book-search-header">
            <input
              type="text"
              class="form-control title-search-bar"
              placeholder="Search by Title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {books.length === 0 && !loading ? (
              <h3 className="mt-4 text-center text-muted">
                {search.length === 0
                  ? "Type in search bar to search"
                  : "No Books Found"}
              </h3>
            ) : (
              <></>
            )}
          </div>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onSelect={() => history.push(`/bookdetails/${book.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Search;
