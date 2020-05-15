import Navbar from "./Navbar";
import React, { Component } from "react";
import { connect } from "react-redux";
import Timer from "./Timer";
import { fetchTaskData } from "../../redux/task/task_action";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProject: "",
      newTask: "",
    };
  }

  loadTasks = () => {
    const config = {
      method: "POST",
      url: "http://localhost:5000/tasks",
      data: {
        user_id: this.props.user_id,
      },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"],
      },
    };
    const result = this.props.fetchTaskData(config);
    console.log(result);
  };
  componentDidMount() {
    this.loadTasks();
  }
  render() {
    return (
      <div>
        <Navbar />
        Home page
        {/* show all the projects and tasks */}
        {this.props.data.data &&
          this.props.data.data.map((ele) => (
            <li key={ele.id}>
              {ele["project_name"]} - {ele["task_name"]} - {ele["start_time"]} -{" "}
              {ele["end_time"]} - {ele["elapsed_time"]} - - {ele["total_time"]}
            </li>
          ))}
        {/* show input field to create project or task */}
        <Timer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.task_reducer.data,
    status: state.task_reducer.status,
    user_id: state.auth_reducer.data.user_id,
  };
};
const mapDispatchToProps = { fetchTaskData };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
