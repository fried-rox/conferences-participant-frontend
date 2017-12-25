import React from "react";
import { Route, Switch } from "react-router-dom";

// import Dashboard from "./containers/Dashboard";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import CreateProfile from "./containers/CreateProfile";
import UpdateProfile from "./containers/UpdateProfile";
import Registration from "./containers/Registration";
import Submission from "./containers/Submission";
import Review from "./containers/Review";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/participant/:id" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/participant/:id/createprofile" exact component={CreateProfile} props={childProps} />
    <AuthenticatedRoute path="/participant/:id/updateprofile" exact component={UpdateProfile} props={childProps} />
    <AuthenticatedRoute path="/participant/:id/registration" exact component={Registration} props={childProps} />
    <AuthenticatedRoute path="/participant/:id/submitabstract" exact component={Submission} props={childProps} />
    <AuthenticatedRoute path="/participant/:id/reviewabstract" exact component={Review} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
