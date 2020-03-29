import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./components/layout/layout";
import Navigation from "./components/navigation/navigation";
import Home from "./pages/home/home";
import SubmitReview from "./pages/submit-review/submit-review";
import ApartmentPage from "./pages/apartment-page/apartment-page";
import SignUp from "./pages/sign-up/sign-up";
import Login from "./pages/login/login";
import Callback from "./pages/callback/callback";
import BuildingPage from "./pages/building-page/building-page";

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
        <Route path="/apartment/:id">
          <ApartmentPage />
        </Route>
        <Route path="/building/:id">
          <BuildingPage />
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/callback">
          <Callback />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
