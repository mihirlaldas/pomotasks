import Navbar from "./Navbar";
import React, { Component } from "react";
import Timer from "./Timer";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProject: "",
      newTask: "",
    };
  }
  render() {
    return (
      <div>
        <Navbar />
        Home page
        {/* show all the projects and tasks */}
        {/* show input field to create project or task */}
        <Timer />
      </div>
    );
  }
}

export default Home;
