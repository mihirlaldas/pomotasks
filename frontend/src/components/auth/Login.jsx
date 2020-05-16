import React, { Component } from "react";
import { fetchAuthData, toggleLogin } from "../../redux/auth/auth_action";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    //   api call
    const config = {
      method: "POST",
      url: "http://localhost:5000/login",
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    };
    const result = await this.props.fetchAuthData(config);
    console.log(result);
    if (result.payload.status === 200) {
      if (result.payload.data.error) alert(result.payload.data.message);
      else if (!this.props.data.error) {
        // alert("success login.   token :" + result.payload.data.token);

        localStorage.setItem("user", JSON.stringify(result.payload.data));

        console.log("login sucessfull");
        await this.props.toggleLogin();

        this.props.history.push("/");
      }
    } else {
      this.setState({
        email: "",
        password: "",
      });
      alert("server error");
    }
  };

  render() {
    console.log(this.props.isLoggedin);

    if (this.props.isLoggedin === true) return <Redirect to="/" />;
    else {
      return (
        <div>
          <h1>Login Page</h1>
          <form
            onSubmit={this.handleSubmit}
            className="form-group mt-2 p-2 bg-light w-50 m-auto text-left"
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="form-control mb-1"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="form-control mb-1"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button type="submit" className="btn btn-primary btn-block p-2">
              Login
            </button>
          </form>
          <Link to="/signup">Register New User</Link>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedin: state.auth_reducer.isLoggedin,
    data: state.auth_reducer.data,
    status: state.auth_reducer.status,
  };
};

const mapDispatchToProps = { fetchAuthData, toggleLogin };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
