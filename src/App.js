import React from "react";
import "./App.css";
import Register from "./Pages/Registration/registration.jsx";
import Login from "./Pages/Login/login.jsx";
import ForgotPassword from "./Pages/ForgotPassword/forgot.jsx";
import ResetPassword from "./Pages/ResetPassword/resetPassword.jsx";
import { BrowserRouter, Route, Switch , Redirect} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/dashboard.jsx";


function App() {

  return (
    <div>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Redirect path="/" to="/login" exact />
            <Route path="/registration" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/forgotPassword" component={ForgotPassword} exact />
            <Route path="/resetpassword/:token" component={ResetPassword} exact />
            <Route path="/dashboard" component={Dashboard} exact />

          </Switch>
        </BrowserRouter>
      </div>
     
    </div>
  );
}

export default App;
