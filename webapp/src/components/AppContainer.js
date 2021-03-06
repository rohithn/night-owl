import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import { AdminRoute, AuthRoute, PrivateRoute } from "../routes/ProtectedRoutes";
import AddBook from "./AddBook/AddBookPage";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import BookDetailsPage from "./BookDetails/BookDetailsPage";
import BookListPage from "./BookList/BookListPage";
import Dashboard from "./Dashboard/Dashboard";
import ListDisplay from "./Dashboard/ListDisplay";
import Search from "./Dashboard/Search";
import NotFoundPage from "./ErrorPages/NotFoundPage";
import Header from "./Header/Header";

const AppContainer = () => {
  return (
    <AuthProvider>
      <Header />
      <div className="app-content">
        <Switch>
          <PrivateRoute exact path={"/"} component={Dashboard} />
          <PrivateRoute
            exact
            path={"/bookdetails/:id"}
            component={BookDetailsPage}
          />
          <AdminRoute exact path={"/addbook"} component={AddBook} />
          <PrivateRoute exact path={"/allbooks"} component={BookListPage} />
          <PrivateRoute exact path={"/list"} component={ListDisplay} />
          <PrivateRoute exact path={"/search"} component={Search} />
          <AuthRoute path={"/login"} component={SignIn} />
          <AuthRoute path={"/register"} component={SignUp} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </AuthProvider>
  );
};

export default AppContainer;
