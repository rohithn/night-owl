import {
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

export const getBooks = async (categories, sortBy, isSortDescending) => {
  const bookListResponse = await fetch(
    `${BOOK_LIST_API_URL}?categories=${categories.join(
      ","
    )}&sortBy=${sortBy}&sortOrder=${isSortDescending ? "desc" : "asc"}`
  );
  return await bookListResponse.json();
};

export const getBookById = async (id) => {
  const header = { "Content-Type": "application/json", ...getAuthHeader() };
  console.log(header);
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
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeader() },
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
