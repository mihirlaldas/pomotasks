import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleLogin } from "../../redux/auth/auth_action";

function Navbar(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <Link to="/">
            <button className="btn btn-info">
              Pomo<span className="text-warning">Tasks</span>
            </button>
          </Link>
        </div>
        <div className="col-9">
          {props.isLoggedin ? (
            <div className="d-flex justify-content-end ">
              <Link to="/user" className="p-1">
                <button className=" btn btn-outline-primary">Profile</button>
              </Link>
              <Link to="" className="p-1">
                <button
                  onClick={() => props.toggleLogin()}
                  className="btn btn-outline-primary"
                >
                  Logout
                </button>
              </Link>
            </div>
          ) : (
            <div className="d-flex justify-content-end ">
              <Link to="/login" className="p-1">
                <button className=" btn btn-outline-primary">Login</button>
              </Link>
              <Link to="signup" className="p-1">
                <button className=" btn btn-outline-primary">Signup</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.auth_reducer.isLoggedin,
  };
};

const mapDispatchToProps = { toggleLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
