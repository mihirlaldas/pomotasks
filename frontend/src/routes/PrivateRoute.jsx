import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Login from "../components/auth/Login";

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <div>
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.cloneElement(children, props)
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth_reducer.isLoggedin
  };
};

export default connect(mapStateToProps)(PrivateRoute);
