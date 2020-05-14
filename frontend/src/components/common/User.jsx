import React, { useEffect } from "react";
import { fetchAuthData } from "../../redux/auth/auth_action";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function User(props) {
  useEffect(() => {
    //   api call
    const config = {
      method: "GET",
      url: "http://localhost:5000/user",
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"],
      },
    };
    props.fetchAuthData(config);
  }, []);

  return (
    <div>
      <h1>User info</h1>
      <p>email-{props.data.data && props.data.data.email}</p>
      <p>name-{props.data.data && props.data.data.name}</p>
      <p>id-{props.data.data && props.data.data.id}</p>
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

const mapDispatchToProps = { fetchAuthData };
export default connect(mapStateToProps, mapDispatchToProps)(User);
