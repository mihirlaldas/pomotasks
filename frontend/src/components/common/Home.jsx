import Navbar from "./Navbar";
import React, { Component } from "react";
import { connect } from "react-redux";
import Timer from "./Timer";
import {
  fetchTaskData,
  fetchAllTaskData,
  create,
} from "../../redux/task/task_action";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      project_id: null,
      task_name: "",
      project_name: "",
      start_time: "",
      end_time: "",
      current_time: { h: 0, m: 0, s: 0 },
      current_task_name: "",
      elapsed_time: {},
      str_elapsed_time: "",
      current_task_id: null,
    };
    // localStorage.setItem("user", this.props.user_data);
  }

  loadProjects = () => {
    const config = {
      method: "POST",
      url: "http://localhost:5000/projects",
      data: {
        user_id: this.state.user_id,
      },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"],
      },
    };
    const result = this.props.fetchTaskData(config);
    console.log("load projects", result);
    return result;
  };

  loadTasks = () => {
    const config = {
      method: "POST",
      url: "http://localhost:5000/tasks",
      data: {
        user_id: this.state.user_id,
      },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"],
      },
    };
    const result = this.props.fetchAllTaskData(config);
    console.log("load task", result);
    return result;
  };

  createProject = () => {
    const config = {
      method: "POST",
      url: "http://localhost:5000/create_project",
      data: {
        user_id: this.props.user_id,
        project_name: this.state.project_name,
      },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"],
      },
    };
    const result = this.props.create(config);
    console.log("create project", result);
    return result;
  };
  createTask = () => {
    const config = {
      method: "POST",
      url: "http://localhost:5000/create_task",
      data: {
        user_id: this.state.user_id,
        project_id: this.state.project_id,
        task_name: this.state.task_name,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        // elapsed_time: { h: 0, m: 0, s: 0 },
      },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"],
      },
    };
    const result = this.props.create(config);
    console.log("create task", result);
    return result;
  };

  updateTask = () => {
    const config = {
      method: "POST",
      url: "http://localhost:5000/update_task",
      data: {
        task_id: this.state.current_task_id,
        elapsed_time:
          this.state.elapsed_time.h +
          ":" +
          this.state.elapsed_time.m +
          ":" +
          this.state.elapsed_time.s,
      },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"],
      },
    };
    const result = this.props.create(config);
    console.log("update task", result);
    return result;
  };

  componentDidMount() {
    this.loadProjects();
    this.loadTasks();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changeElapsedTime = (key) => {
    const current_task_db =
      // Array.isArray(this.props.tasks) &&
      this.props.tasks.find((ele) => ele["id"] == key);
    console.log("change current task db", current_task_db);
    const elp_time = current_task_db.elapsed_time.split(":");
    this.setState({
      current_task_id: key,
      current_task_name: current_task_db.task_name,
      elapsed_time: {
        h: Number(elp_time[0]),
        m: Number(elp_time[1]),
        s: Number(elp_time[2]),
      },
      current_task_db: current_task_db,
      str_elapsed_time: current_task_db.elapsed_time,
    });
  };

  handleTaskChange = async (e) => {
    console.log("handleTaskchange called");
    this.handleChange(e);
    this.changeElapsedTime(e.target.value);
  };

  updateElapsedTime = () => {
    console.log("update elapsed time");
    let plusMinute = Math.floor(
      (this.state.elapsed_time.s + this.state.current_time.s) / 60
    );
    let newSecond =
      (this.state.elapsed_time.s + this.state.current_time.s) % 60;
    let plusHour = Math.floor(
      (this.state.elapsed_time.m + this.state.current_time.m) / 60
    );
    let newMinute =
      (this.state.elapsed_time.m + this.state.current_time.m + plusMinute) % 60;
    let newHour =
      this.state.elapsed_time.h + this.state.current_time.h + plusHour;

    this.setState({
      elapsed_time: {
        h: newHour,
        m: newMinute,
        s: newSecond,
      },
      str_elapsed_time: newHour + ":" + newMinute + ":" + newSecond,
    });
    return Promise;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await this.createTask();
    alert(this.props.createMsg.message);
    await this.loadTasks();
  };

  submitProject = async (e) => {
    e.preventDefault();
    await this.createProject();
    await this.loadProjects();
    alert(this.props.createMsg.message);
  };

  handleSubmitTask = async (e) => {
    e.preventDefault();
    await this.updateElapsedTime();
    await this.updateTask();
    alert(this.props.createMsg.message);
    await this.loadTasks();
    this.changeElapsedTime(this.state.current_task_id);
  };
  timerResult = (timeState) => {
    console.log(timeState);
    this.setState({
      current_time: {
        h: timeState.hour,
        m: timeState.minutes,
        s: timeState.second,
      },
    });
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.elapsed_time !== this.state.elapsed_time) {
  //     console.log("compoent did update");
  //   }
  // }
  render() {
    return (
      <div>
        <Navbar />
        Home page
        <Timer timerFnc={this.timerResult} />
        {/* set time for a task */}
        <form
          className="form-group py-2 bg-info w-50 m-auto"
          onSubmit={this.handleSubmitTask}
        >
          <br />
          <label htmlFor="current_task_id">Choose task</label>
          <select
            className="form-control"
            name="current_task_id"
            value={this.state.current_task_id}
            onChange={this.handleTaskChange}
            required
          >
            {this.props.tasks &&
              this.props.tasks.map((ele) => (
                <option key={ele.id} value={ele.id}>
                  {ele.task_name}
                </option>
              ))}
          </select>
          {this.state.current_task_db && (
            <div>
              <p>Start TIme : {this.state.current_task_db.start_time}</p>
              <p>End TIme : {this.state.current_task_db.end_time}</p>
              <p>Total TIme : {this.state.current_task_db.total_time}</p>

              <p>Elapsed TIme : {this.state.current_task_db.elapsed_time}</p>
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            Submit Task
          </button>
        </form>
        {/* show input field to create project or task */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-4 mr-1">
              <form onSubmit={this.submitProject} className="form-control ">
                <input
                  type="text"
                  name="project_name"
                  value={this.state.project_name}
                  placeholder="Create new Project"
                  onChange={this.handleChange}
                />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="col-4 bg-light border shadow rounded">
              <form className="form-group" onSubmit={this.handleSubmit}>
                {this.props.data.data && this.props.data.data.length > 0 ? (
                  <>
                    <input
                      type="text"
                      name="task_name"
                      value={this.state.task_name}
                      placeholder="Enter new Task"
                      onChange={this.handleChange}
                      required
                    />
                    <br />
                    <label htmlFor="project_id">Choose project</label>
                    <select
                      className="form-control"
                      name="project_id"
                      value={this.state.project_id}
                      onChange={this.handleChange}
                      required
                    >
                      {this.props.data.data.map((ele) => (
                        <option key={ele.id} value={ele.id}>
                          {ele.project_name}
                        </option>
                      ))}
                    </select>
                    <br />
                    <div className="d-flex justify-content-around">
                      <label htmlFor="start_time">Start time</label>
                      <input
                        type="time"
                        value={this.state.start_time}
                        name="start_time"
                        onChange={this.handleChange}
                        className="form-control"
                        required
                      />
                      <label htmlFor="end_time">End time</label>
                      <input
                        type="time"
                        value={this.state.end_time}
                        name="end_time"
                        onChange={this.handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </>
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.task_reducer.data,
    status: state.task_reducer.status,
    user_id: state.auth_reducer.data.user_id,
    user_data: state.auth_reducer.data,
    createMsg: state.task_reducer.createMsg,
    tasks: state.task_reducer.tasks.data,
  };
};
const mapDispatchToProps = { fetchTaskData, fetchAllTaskData, create };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
