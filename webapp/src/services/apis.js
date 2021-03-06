import {
  BOOKS_AUTHOR_API_URL,
  BOOKS_CATEGORY_API_URL,
  BOOK_LIST_API_URL,
  CATEGORIES_API_URL,
  LOGIN_API_URL,
  RATINGS_API_URL,
  REGISTER_API_URL,
} from "../constants";

export function getAuthHeader() {
  // return authorization header with basic auth credentials
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}

export const getCategories = async () => {
  const categoriesRes = await fetch(CATEGORIES_API_URL);
  return await categoriesRes.json();
};

export const searchBooks = async (searchString) => {
  const bookListResponse = await fetch(
    `${BOOK_LIST_API_URL}?title=${searchString}`
  );
  return await bookListResponse.json();
};

export const getBooks = async (categories, sortBy, isSortDescending) => {
  const bookListResponse = await fetch(
    `${BOOK_LIST_API_URL}?categories=${categories.join(
      ","
    )}&sortBy=${sortBy}&sortOrder=${isSortDescending ? "desc" : "asc"}`
  );
  return await bookListResponse.json();
};

export const getBooksByAuthor = async (author, sortBy, isSortDescending) => {
  const bookListResponse = await fetch(
    `${BOOK_LIST_API_URL}?author=${author}&sortBy=${sortBy}&sortOrder=${
      isSortDescending ? "desc" : "asc"
    }`
  );
  return await bookListResponse.json();
};

export const getTopBooks = async () => {
  const bookListResponse = await fetch(
    `${BOOK_LIST_API_URL}?sortBy=rating&sortOrder=desc&limit=10`
  );
  return await bookListResponse.json();
};

export const getBookById = async (id) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
  };
  const bookDetailsResponse = await fetch(
    BOOK_LIST_API_URL + "/" + id,
    requestOptions
  );
  return await bookDetailsResponse.json();
};

export const getRatingForBook = async (book_id) => {
  const ratingsRes = await fetch(RATINGS_API_URL + "/" + book_id);
  return await ratingsRes.json();
};

export const postRatingForBook = async (book_id, user_id, rating) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
    body: JSON.stringify({
      book_id,
      user_id,
      rating,
    }),
  };
  const resp = await fetch(RATINGS_API_URL, requestOptions);
  const respJson = await resp.json();
  if (resp.status === 200) {
    return await respJson;
  } else {
    throw new Error(respJson.message);
  }
};

export const postBook = async (book) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(book),
    };
    const resp = await fetch(BOOK_LIST_API_URL, requestOptions);
    const respJson = await resp.json();

    if (resp.status === 201) {
      return respJson;
    } else {
      throw new Error(JSON.stringify(respJson));
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postLogin = async (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };
  const resp = await fetch(LOGIN_API_URL, requestOptions);
  const respJson = await resp.json();
  if (resp.status === 200) {
    return await respJson;
  } else {
    throw new Error(respJson.message);
  }
};

export const postRegister = async (name, email, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  };
  const resp = await fetch(REGISTER_API_URL, requestOptions);
  const respJson = await resp.json();
  if (resp.status === 200) {
    return await respJson;
  } else {
    throw new Error(respJson.message);
  }
};

export const getBookCountByCategory = async () => {
  const categoriesJson = await fetch(BOOKS_CATEGORY_API_URL);
  return await categoriesJson.json();
};

export const getBookCountByAuthor = async () => {
  const categoriesJson = await fetch(BOOKS_AUTHOR_API_URL);
  return await categoriesJson.json();
};
