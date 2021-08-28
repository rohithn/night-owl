import {
  BOOK_LIST_API_URL,
  CATEGORIES_API_URL,
  RATINGS_API_URL,
} from "../constants";

export const getCategories = async () => {
  const categoriesRes = await fetch(CATEGORIES_API_URL);
  return await categoriesRes.json();
};

export const getBooks = async (categories, sortBy, isSortDescending) => {
  const bookListResponse = await fetch(
    `${BOOK_LIST_API_URL}?categories=${categories.join(
      ","
    )}&sortBy=${sortBy}&sortOrder=${isSortDescending ? "desc" : "asc"}`
  );
  return await bookListResponse.json();
};

export const getBookById = async (id) => {
  const bookDetailsResponse = await fetch(BOOK_LIST_API_URL + "/" + id);
  return await bookDetailsResponse.json();
};

export const getRatingForBook = async (book_id) => {
  const ratingsRes = await fetch(RATINGS_API_URL + "/" + book_id);
  return await ratingsRes.json();
};

export const postBook = async (book) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  };
  const resp = await fetch(BOOK_LIST_API_URL, requestOptions);
  const respJson = await resp.json();
  if (resp.status === 200) {
    return await respJson;
  } else {
    throw new Error(respJson.message);
  }
};
