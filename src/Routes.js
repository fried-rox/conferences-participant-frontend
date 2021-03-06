import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./containers/Dashboard";
// import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
// import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
// import CreateProfile from "./containers/CreateProfile";
import UpdateProfile from "./containers/UpdateProfile";
import Registration from "./containers/Registration";
import Submission from "./containers/Submission";
import Review from "./containers/Review";

export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path="/view_profile" exact component={Dashboard} props={childProps} />
    <UnauthenticatedRoute path="/login/:id" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/new_cat_reg/:id" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/update_profile" exact component={UpdateProfile} props={childProps} />
    <AuthenticatedRoute path="/registration" exact component={Registration} props={childProps} />
    <AuthenticatedRoute path="/submit_abstract" exact component={Submission} props={childProps} />
    <AuthenticatedRoute path="/review_abstract" exact component={Review} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
