import Navbar from "./Navbar";
import React, { Component } from "react";
import { connect } from "react-redux";
import Timer from "./Timer";
import { fetchTaskData, create } from "../../redux/task/task_action";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:
        JSON.parse(localStorage.getItem("user"))["user_id"] ||
        this.props.user_id,
      project_id: null,
      task_name: "",
      project_name: "",
      start_time: null,
      end_time: null,
    };
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
    console.log(result);
  };

  createProject = () => {
    const config = {
      method: "POST",
      url: "http://localhost:5000/create_project",
      data: {
        user_id: this.props.user_id,
        project_name: this.state.newProject,
      },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"],
      },
    };
    const result = this.props.create(config);
    console.log(result);
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
      },
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("user"))["token"],
      },
    };
    const result = this.props.create(config);
    console.log(result);
  };

  componentDidMount() {
    this.loadProjects();
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.createTask();
  };

  submitProject = async (e) => {
    e.preventDefault();
    await this.createProject();
    this.loadProjects();
  };
  render() {
    return (
      <div>
        <Navbar />
        Home page
        <Timer />
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
    createMsg: state.task_reducer.createMsg,
  };
};
const mapDispatchToProps = { fetchTaskData, create };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
