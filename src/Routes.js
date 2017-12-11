import React from "react";
import { Route, Switch } from "react-router-dom";

import Welcome from "./containers/Welcome";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import CreateProfile from "./containers/CreateProfile";
import Participant from "./containers/Participant";
import UpdateProfile from "./containers/UpdateProfile";
import Home from "./containers/Home";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/participant/:id" exact component={Welcome} props={childProps} />
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/participant/:id/createprofile" exact component={CreateProfile} props={childProps} />
    <AuthenticatedRoute path="/participant/:id/viewprofile" exact component={Participant} props={childProps} />
    <AuthenticatedRoute path="/participant/:id/updateprofile" exact component={UpdateProfile} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
