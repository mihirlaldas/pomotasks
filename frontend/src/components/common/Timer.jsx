import React from "react";
export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      minutes: 5,
      second: 0,
      showInput: false,
      isOn: false,
    };
  }

  handleInput = (e) => {
    clearInterval(this.interval);
    this.setState({
      minutes: e.target.value,
    });
  };
  showInput = () => {
    this.setState({
      showInput: true,
      minutes: null,
      second: 0,
    });
  };
  start = () => {
    this.interval = setInterval(
      () =>
        this.setState({
          showInput: false,
          isOn: true,
          second: this.state.second > 0 ? this.state.second - 1 : 59,
          minutes:
            this.state.second === 0
              ? this.state.minutes - 1
              : this.state.minutes,
        }),
      1000
    );
  };

  stop = () => {
    console.log("stop");
    clearInterval(this.interval);
    this.setState({
      isOn: false,
    });
  };

  reset = () => {
    this.stop();
    this.setState({
      minutes: 5,
      second: 0,
    });
  };

  render() {
    if (this.state.minutes === 0 && this.state.second === 0) this.stop();
    if (this.state.showInput) {
      return (
        <div>
          <h1>Timer</h1>
          <div className="form-group mx-auto w-50">
            <input
              className="form-control"
              type="text"
              value={this.state.minutes}
              onChange={this.handleInput}
              placeholder="Minutes"
            />

            <button onClick={this.start} className="btn btn-outline-primary">
              Start
            </button>
            <button onClick={this.stop} className="btn btn-outline-primary">
              Stop
            </button>
            <button onClick={this.reset} className="btn btn-outline-primary">
              Reset
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container bg-light shadow border rounded w-50 p-4">
          <h1>Timer</h1>
          <h1>
            {this.state.minutes}
            <small>m</small> {this.state.second}
            <small>s</small>
          </h1>
          {/* toggle start and stop */}
          {this.state.isOn ? (
            <button onClick={this.stop} className="btn btn-danger px-3 m-1">
              Stop
            </button>
          ) : (
            <button onClick={this.start} className="btn btn-primary px-3 m-1">
              Start
            </button>
          )}

          <button
            onClick={this.reset}
            className="btn btn-outline-primary p-1 m-1"
          >
            Reset
          </button>
          <button
            onClick={this.showInput}
            className="btn btn-outline-primary p-1 m-1"
          >
            Set Minutes
          </button>
        </div>
      );
    }
  }
}
