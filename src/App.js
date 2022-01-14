import React, { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    count: 0,
    isCounting: false,
  };

  componentDidMount() {
    const userCount = localStorage.getItem("timer");
    if (userCount) {
      this.setState({ count: +userCount });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("timer", this.state.count);
  }

  componentWillUnmount() {
    clearInterval(this.counterId);
  }

  handleStart = () => {
    this.setState({ isCounting: true });
    this.counterId = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  };

  handleStop = () => {
    this.setState({ isCounting: false });
    clearInterval(this.counterId);
  };

  handleReset = () => {
    this.setState({ isCounting: false, count: 0 });
    clearInterval(this.counterId);
  };

  render() {
    return (
      <div className="App">
        <h1>React Timer</h1>
        <h2>{this.state.count}</h2>
        {!this.state.isCounting ? (
          <button onClick={this.handleStart} className="btn btn-primary">
            Start
          </button>
        ) : (
          <button onClick={this.handleStop} className="btn btn-danger">
            Stop
          </button>
        )}

        <button
          onClick={this.handleReset}
          className="btn btn-warning"
          style={{ marginLeft: "2rem" }}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default App;
