import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./views/Login";
import Detail from "./views/Detail";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import History from "./views/History";
import Aspiration from "./views/Aspiration";
import Announcement from "./views/Announcement";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/aspiration">
            <Aspiration />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/announcement">
            <Announcement />
          </Route>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
