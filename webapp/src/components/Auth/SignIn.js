import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Footer from "../Header/Footer";
import "./signin.css";

const SignIn = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    performLogin();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const performLogin = async () => {
    await login(email, password);
    history.push("/");
  };

  return (
    <>
      <div className="signin-content">
        <div className="form-signin text-center">
          <form>
            <svg
              className="sign-in-logo mb-3"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 283 401"
              fill="#ffcd33"
            >
              <path d="M19.7 1.7c-1.9 3.2-8.1 25.6-9.7 35C6.6 56.1 7.8 81 12.8 98.8l1.8 6.4-5.3 10.6c-8 16.4-10.1 30.6-6.8 46.6 2.5 11.9 7.3 22.3 14.7 31.8l2.8 3.6-1.9 3.4c-2.7 4.5-6.8 19.2-8.7 30.8-2.1 12.8-1.4 39.8 1.5 52.1 6.8 29.6 19.1 52 40.3 73.3L63 369.3v11.1c0 12.5.8 14.9 6 18.4 8.3 5.6 20-1.5 20-12.2v-2.4l8 3.4c10.3 4.3 21.9 7.8 34.5 10.4l9.9 2 10.3-2c11.7-2.4 25.6-6.6 36.1-10.9l7.2-3v2.5c0 10.7 11.7 17.8 20 12.2 5.2-3.5 6-5.9 6-18.4v-11l11.8-12c21.3-21.4 33.5-43.7 40.3-73.3 2.9-12.3 3.6-39.3 1.5-52.1-1.9-11.7-6-26.3-8.7-30.9l-2-3.4 2.9-3.6c7.3-9.2 12.2-19.7 14.7-31.7 3.3-16 1.2-30.2-6.8-46.5l-5.3-10.7 1.3-4.8c3.3-12.3 4.5-21 5-35.4.4-12.8.2-17.6-1.5-27.7-1.9-11-8.4-33.7-10.1-35.6-1-1.1-22.9 3.7-33.1 7.2-11.9 4.1-18.6 7.2-30 14.1l-9.9 6H92.9L83 23C66.5 13 52.9 7.7 32.8 3.5 19.3.6 20.3.8 19.7 1.7zm33 34.8c14.1 5.9 28.8 15.9 39.8 27 8.8 8.8 19.3 22.5 16.4 21.2-17.4-7.5-24.8-9.1-38.9-8.4-11.4.6-18.3 2.3-27.4 6.8-3.2 1.6-5.9 2.9-6.1 2.9-.2 0-.8-3.9-1.5-8.7-1.4-9.7-.9-30.1 1-40 1.2-6.1 1.3-6.3 3.9-5.7 1.4.4 7.2 2.6 12.8 4.9zm195.3.7c1.9 10 2.4 30.4 1 40.1-.7 4.8-1.3 8.7-1.5 8.7-.2 0-3-1.3-6.3-3-8.5-4.2-16.1-6.1-27.7-6.7-13.6-.7-21.2 1-38.4 8.4-2.9 1.3 7.6-12.4 16.4-21.2 9.5-9.6 24.5-20.4 35-25.1 5.9-2.6 18.4-7.3 19.6-7.4.4 0 1.2 2.8 1.9 6.2zm-85 18.2c0 .3-2.4 3.7-5.4 7.7-3 3.9-7.6 11.4-10.3 16.5-2.6 5.2-5 9.4-5.3 9.4-.3 0-2.4-3.7-4.8-8.3-2.4-4.5-7-11.9-10.2-16.5-3.3-4.6-6-8.5-6-8.8 0-.2 9.5-.4 21-.4 11.6 0 21 .2 21 .4zm-77.5 48.1c13.6 3.6 24.2 12.4 30.3 25.2 3.3 7.1 3.7 8.7 4 18 .5 11.1-.9 17-5.6 25.2-12.8 22.5-42 29.9-64.7 16.6-9.7-5.6-18.9-18.7-21.4-30.3-5.1-24.1 10.8-49.5 34.6-55.1 6-1.4 16.4-1.2 22.8.4zm135.4-.4c16.4 3.7 30.1 17.5 34.6 34.4 3.9 15.2-.5 31.2-11.8 43.3-9.2 9.7-19.8 14.2-33.3 14.2-21.3 0-38.3-12.4-44.9-32.8-1.3-4.1-1.6-7.8-1.3-15.5.3-9.3.7-10.9 4-18 7.9-16.5 23.5-26.5 41.8-26.6 3.6 0 8.5.4 10.9 1zM145.3 181c7.9 16.7 25 31.2 43.5 37l5.3 1.7-9 7.1c-15.7 12.6-29.3 29-38.7 46.7l-4.8 8.9-1.4-3.4c-2.2-5.5-9-16.8-14.8-24.6-7.5-10.2-16.5-19.5-26.8-27.8-6.7-5.4-8.5-7.2-7-7.4 4.4-.8 15.4-5.8 21.5-9.7 11.3-7.3 23.5-21.4 27.1-31.3.7-1.7 1.4-3.2 1.8-3.1.3 0 1.8 2.7 3.3 5.9zM45.2 226.1c29.4 10.1 55.3 32.6 69.5 60.5 10.5 20.4 13.5 35.1 13.1 64.1l-.3 20.2-11-3.8C96.3 360.2 82 352 70.2 340.3c-19.1-18.8-31.7-43.9-35.2-70-2-14.8.1-46.3 3.1-46.3.5 0 3.7 1 7.1 2.1zm202.8 3.6c.7 3.2 1.4 12.1 1.7 19.8.8 21.8-2.7 38.4-11.9 57.3-8.5 17.4-22.8 34.7-36.4 43.9-9 6.1-21.4 12-34.3 16.3l-11.6 3.9-.3-20.1c-.3-22.6.8-30.8 5.9-46.3 10.1-30.3 33.6-57.2 62.9-72 7.2-3.7 19.3-8.4 21.6-8.5.6 0 1.7 2.6 2.4 5.7z"></path>
              <path d="M64.8 133c-5 2.7-8.8 9.3-8.8 15.4 0 16.2 18.7 24.1 30.1 12.7 8.5-8.5 7.1-21-3-27.8-4.4-3-12.9-3.1-18.3-.3zM200.9 133.3c-10.1 6.8-11.5 19.3-3 27.8 11.4 11.4 30.1 3.5 30.1-12.7 0-6.3-3.8-12.7-9-15.4-5.5-2.8-13.7-2.7-18.1.3z"></path>
            </svg>
            <h1 className="h3 mb-3 fw-normal">Sign In</h1>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button
              className="w-100 mt-3 btn btn-default btn-default-fill"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
