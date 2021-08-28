import { RATINGS_API_URL } from "../constants";

export const saveRating = async (book_id, rating) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      book_id,
      user_id: "9c96c5c2-1fdd-42a0-92b3-1edf1c2a0f97",
      rating,
    }),
  };
  const resp = await fetch(RATINGS_API_URL, requestOptions);
  return await resp.json();
};
