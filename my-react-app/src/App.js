import "./styles.css";
// import LoginPage from "./Pages/LoginPage";
// import SignupPage from "./Pages/SignupPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import MainPage from "./Pages/MainPage";




export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/users/login' component={LoginPage} />
        <Route exact path='/users/signup' component={SignupPage} />
        <Route path='/' component={MainPage} />
      </Switch>
    </Router>

  );
}
