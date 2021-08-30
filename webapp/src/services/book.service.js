import {
  getBookById,
  getBookCountByAuthor,
  getBookCountByCategory,
  getBooks,
  getBooksByAuthor,
  getCategories,
  getRatingForBook,
  getTopBooks,
  postBook,
  searchBooks,
} from "./apis";

export const fetchAllBooks = async (sortyBy, descSort) => {
  return await getBooks([], sortyBy, descSort);
};

export const fetchTopBooks = async () => {
  return await getTopBooks();
};

export const fetchBookDetails = async (id) => {
  const bookDetailsJsonData = await getBookById(id);

  const ratingsJson = await getRatingForBook(bookDetailsJsonData.id);

  const categoriesJson = await getCategories();
  const category = categoriesJson.filter(
    (c) => c.id === bookDetailsJsonData.category_id
  );

  bookDetailsJsonData.category = category[0].name;

  if (ratingsJson.length === 0) {
    bookDetailsJsonData.rating = 0;
  } else {
    bookDetailsJsonData.rating =
      ratingsJson.reduce((total, next) => total + next.rating, 0) /
      ratingsJson.length;
  }

  return await bookDetailsJsonData;
};

export const fetchBooksByCategories = async (categories) => {
  return await getBooks(categories, "rating", true);
};

export const fetchBooksByTitle = async (searchString) => {
  return await searchBooks(searchString);
};

export const fetchBooksByAuthor = async (author) => {
  return await getBooksByAuthor(author, "rating", true);
};

export const fetchBookCountByCategory = async () => {
  return await getBookCountByCategory();
};

export const fetchBookCountByAuthor = async () => {
  return await getBookCountByAuthor();
};

export const saveBook = async (book) => {
  try {
    return await postBook(book);
  } catch (e) {
    console.log(e);
    throw e;
  }
};
