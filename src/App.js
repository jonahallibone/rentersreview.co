import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import ga from "react-ga";
import Layout from "./components/layout/layout";
import Navigation from "./components/navigation/navigation";
import Home from "./pages/home/home";
import SubmitReview from "./pages/submit-review/submit-review";
import ApartmentPage from "./pages/apartment-page/apartment-page";
import SignUp from "./pages/sign-up/sign-up";
import Login from "./pages/login/login";
import Callback from "./pages/callback/callback";
import BuildingPage from "./pages/building-page/building-page";

ga.initialize("UA-137477903-5");

const usePageViews = () => {
  const location = useLocation();
  useEffect(() => {
    ga.pageview(location.pathname);
  }, [location]);
};

function App() {
  usePageViews();

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
