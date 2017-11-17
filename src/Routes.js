import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import CreateProfile from "./containers/CreateProfile";
import Participant from "./containers/Participant";

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/participant/:custom:participant-id" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/participants/:id/createprofile" exact component={CreateProfile} props={childProps} />
    <AuthenticatedRoute path="/participants" exact component={Participant} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
