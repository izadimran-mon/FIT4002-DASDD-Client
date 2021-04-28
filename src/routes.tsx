import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Ads from "./pages/Ads";
import Bots from "./pages/Bots";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";

const Routes = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/ads" />
        </Route>
        <Route exact path="/ads" component={Ads} />
        <Route exact path="/bots" component={Bots} />
        <Route exact path="/statistics" component={Statistics} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
