import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./stores";
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
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/aspirasi">
              <Aspiration />
            </Route>
            <Route path="/riwayat">
              <History />
            </Route>
            <Route path="/pengumuman">
              <Announcement />
            </Route>
            <Route path="/detail/:id">
              <Detail />
            </Route>
            <Route path="/beranda">
              <Dashboard />
            </Route>
            <Route path="/daftar">
              <Register />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;