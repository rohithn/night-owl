import { postRatingForBook } from "./apis";

export const saveRating = async (book_id, rating) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return await postRatingForBook(book_id, user.email, rating);
};
