import Navbar from "./Navbar";
import React, { Component } from "react";
import Timer from "./Timer";
export class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        Home page
        <Timer />
      </div>
    );
  }
}

export default Home;
