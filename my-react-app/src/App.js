import "./styles.css";
// import LoginPage from "./Pages/LoginPage";
// import SignupPage from "./Pages/SignupPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import UserPage from "./Pages/UserPage";
import HomePage from "./Pages/HomePage"




export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/users/login' component={LoginPage} />
        <Route exact path='/users/signup' component={SignupPage} />
        <Route path='/users' component={UserPage} />
        <Route exact path='/' component={HomePage} />
      </Switch>
    </Router>

  );
}
