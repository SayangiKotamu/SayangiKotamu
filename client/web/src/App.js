import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

import store from "./stores";
import Login from "./views/Login";
import Detail from "./views/Detail";
import Register from "./views/Register";
import Category from "./views/Category";
import Dashboard from "./views/Dashboard";
import Aspiration from "./views/Aspiration";
import Announcement from "./views/Announcement";
import EmailActivated from "./views/EmailActivated";
import ActivationEmail from "./views/ActivationEmail";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/email-terverifikasi">
              <EmailActivated />
            </Route>
            <Route path="/aktifasi-email/:token">
              <ActivationEmail />
            </Route>
            <Route path="/aspirasi">
              <Aspiration />
            </Route>
            <Route path="/kategori-baru">
              <Category />
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
