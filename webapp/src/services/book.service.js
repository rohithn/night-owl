import {
  getBookById,
  getBooks,
  getCategories,
  getRatingForBook,
  postBook,
} from "./apis";

export const fetchAllBooks = async () => {
  return await getBooks([], "rating", false);
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
  return await getBooks(categories, "rating", false);
};

export const saveBook = async (book) => {
  try {
    return await postBook(book);
  } catch (e) {
    throw e;
  }
};
