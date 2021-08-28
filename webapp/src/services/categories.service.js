import { getCategories } from "./apis";

export const fetchAllCategories = async () => {
  return await getCategories();
};
