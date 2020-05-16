import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function User(props) {
  return (
    <div>
      <h1>User info</h1>
      <p>email-{props.data.email}</p>
      <p>name-{props.data.name}</p>
      <p>id-{props.data.id}</p>
      <Link to="/">
        <button className="btn btn-primary">Home</button>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.auth_reducer.isLoggedin,
    data: state.auth_reducer.data,
    status: state.auth_reducer.status,
  };
};

export default connect(mapStateToProps)(User);
