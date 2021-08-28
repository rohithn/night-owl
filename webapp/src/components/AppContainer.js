import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import BookListPage from "./BookList/BookListPage";
import BookDetailsPage from "./BookDetails/BookDetailsPage";
import AddBook from "./AddBook/AddBookPage";
import Footer from "./Header/Footer";
import Dashboard from "./Dashboard/Dashboard";

const AppContainer = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={"/"} component={BookListPage} />
        <Route exact path={"/bookdetails/:id"} component={BookDetailsPage} />
        <Route exact path={"/addbook"} component={AddBook} />
        <Route exact path={"/dashboard"} component={Dashboard} />
      </Switch>
      <Footer />
    </div>
  );
};

export default AppContainer;
