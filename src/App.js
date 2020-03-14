import React from "react";
import {Switch, Route} from "react-router-dom";
import styles from "./App.module.scss";
import Layout from "./components/layout/layout";
import Navigation from "./components/navigation/navigation";
import Home from "./pages/home/home";
import SubmitReview from "./pages/submit-review/submit-review";

function App() {
  return (
    <Layout>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/submit-review">
          <SubmitReview />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
