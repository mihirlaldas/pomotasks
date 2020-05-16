import React from "react";
export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      hour: 0,
      minutes: 0,
      second: 0,
      isOn: false,
    };
  }

  start = () => {
    this.interval = setInterval(
      () =>
        this.setState((prevState) => ({
          isOn: true,
          second: prevState.second < 60 ? prevState.second + 1 : 0,
          minutes:
            prevState.second === 60 ? prevState.minutes + 1 : prevState.minutes,
          hour: prevState.minutes === 60 ? prevState.hour + 1 : prevState.hour,
        })),
      1000
    );
  };

  stop = () => {
    console.log("stop");
    clearInterval(this.interval);
    this.setState({
      isOn: false,
    });
    this.props.timerFnc(this.state);
  };

  reset = () => {
    this.stop();
    this.setState({
      hour: 0,
      minutes: 0,
      second: 0,
    });
  };

  render() {
    return (
      <div className="container bg-light shadow border rounded w-50 p-4">
        <h1>Timer</h1>
        <h1>
          {this.state.hour} : {this.state.minutes} : {this.state.second}
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
      </div>
    );
  }
}
