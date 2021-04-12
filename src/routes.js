import React from "react";
import "./App.css";
import Registration from "./Pages/Registration/registration.jsx";
import Login from "./Pages/Login/login.jsx";
import ForgotPassword from "./Pages/ForgotPassword/forgotPassword.jsx";
import ResetPassword from "./Pages/ResetPassword/resetPassword.jsx";
import Dashboard from "./Pages/Dashboard/dashboard.jsx"
import ProtectedRoutes from "./Services/protectedRoutes.js"
import { BrowserRouter, Route, Switch , Redirect} from "react-router-dom";


function Routes() {
 return (
        <BrowserRouter>
          <Switch>
            <Redirect path="/" to="/login" exact />
            <Route path="/registration" component={Registration} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/forgotPassword" component={ForgotPassword} exact />
            <Route path="/resetpassword/:token" component={ResetPassword} exact />
            <ProtectedRoutes path="/dashboard" component={Dashboard} />
          </Switch>   
        </BrowserRouter>
  );
}

export default Routes;
