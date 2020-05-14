import React, { Component } from "react";
import { fetchAuthData, authReset } from "../../redux/auth/auth_action";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    //   api call
    const config = {
      method: "POST",
      url: "http://localhost:5000/signup",
      data: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
    };
    this.props.fetchAuthData(config);
    // reset state
    this.setState({
      name: "",
      email: "",
      password: ""
    });
  };

  render() {
    if (this.props.data.error === false) {
      alert(this.props.data.message);
      this.props.authReset();
      return <Redirect to="/login" />;
    } else if (this.props.data.error) {
      alert(this.props.data.message);
      this.props.authReset();
    }
    return (
      <div>
        <h2>Signup Page</h2>
        <form
          onSubmit={this.handleSubmit}
          className="form-group mt-2 p-2 bg-light w-50 m-auto text-left"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control mb-1"
            value={this.state.name}
            onChange={this.handleChange}
          />
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
            Signup
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedin: state.auth_reducer.isLoggedin,
    data: state.auth_reducer.data,
    status: state.auth_reducer.status
  };
};

const mapDispath = { fetchAuthData, authReset };
export default connect(mapStateToProps, mapDispath)(Signup);
