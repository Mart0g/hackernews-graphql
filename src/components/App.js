import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import LinkList from "./LinkList";
import Login from "./Login";
import SubmitLink from "./SubmitLink";

const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path="/" component={LinkList} />
        <Route exact path="/submit" component={SubmitLink} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  </div>
);

export default App;
