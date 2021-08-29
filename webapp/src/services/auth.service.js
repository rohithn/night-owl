import { postLogin, postRegister } from "./apis";

export const doLogin = async (email, password) => {
  const user = await postLogin(email, password);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const doRegister = async (name, email, password) => {
  const user = await postRegister(name, email, password);
  return user;
};
