import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import BookListPage from "./BookList/BookListPage";
import BookDetailsPage from "./BookDetails/BookDetailsPage";
import AddBook from "./AddBook/AddBookPage";

const AppContainer = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={"/"} component={BookListPage} />
        <Route exact path={"/bookdetails/:id"} component={BookDetailsPage} />
        <Route exact path={"/addbook"} component={AddBook} />
      </Switch>
    </div>
  );
};

export default AppContainer;
