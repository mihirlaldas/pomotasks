import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../components/common/Home";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/common/NotFound";
import User from "../components/common/User";

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/" exact component={Home} />

        <PrivateRoute path="/user">
          <User />
        </PrivateRoute>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
