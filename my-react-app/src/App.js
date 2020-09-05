import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import UserPage from "./Pages/UserPage";
import HomePage from "./Pages/HomePage"
// import { Redirect } from 'react-router-dom';


// function PrivateRoute({ component: Component, ...rest }) {
//   let authed = false;
//   fetch('http://localhost:5000/auth')
//     .then(res => {
//       res.json().then(data => {
//         console.log(data.auth)
//         if (data.auth) {
//           authed = true
//         }
//       })
//     })
//     .catch(err => {
//       console.error(err);
//       alert('Error auth');
//     });
//   return (
//     <Route
//       {...rest}
//       render={
//         (props) => authed === true
//         ? <Redirect to={{ pathname: '/users', state: { from: props.location } }} /> 
//         : <Component {...props} />
//       }
//     />
//   )
// }

export default function App() {

  return (
    <Router>
      <Switch>
        <Route exact path='/users/login' component={LoginPage} />
        {/* <PrivateRoute exact path='/users/login' component={LoginPage} /> */}
        <Route exact path='/users/signup' component={SignupPage} />
        <Route path='/users' component={UserPage} />
        {/* <PrivateRoute path='/users' component={UserPage} /> */}
        <Route exact path='/' component={HomePage} />
      </Switch>
    </Router>

  );
}
