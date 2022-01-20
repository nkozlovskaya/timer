import React, { useEffect, useReducer } from "react";

const countReduser = (state, { type }) => {
  switch (type) {
    case "START":
      return {
        ...state,
        isCounting: true,
      };
    case "STOP":
      return {
        ...state,
        isCounting: false,
      };
    case "RESET":
      return {
        count: 0,
        isCounting: false,
      };
    case "TICK":
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
};

function setDefaultValue() {
  const userCount = localStorage.getItem("count");
  return userCount ? +userCount : 0;
}

function Timer() {
  const [{ count, isCounting }, dispatch] = useReducer(countReduser, {
    count: setDefaultValue(),
    isCounting: false,
  });

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  useEffect(() => {
    let timerId = null;
    if (isCounting) {
      timerId = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }
    return () => {
      timerId && clearInterval(timerId);
      timerId = null;
    };
  }, [isCounting]);

  return (
    <div className="timer">
      <h1>React timer hooks</h1>
      <h2>{count}</h2>
      {!isCounting ? (
        <button
          onClick={() => dispatch({ type: "START" })}
          className="btn btn-primary"
        >
          Start
        </button>
      ) : (
        <button
          onClick={() => dispatch({ type: "STOP" })}
          className="btn btn-danger"
        >
          Stop
        </button>
      )}

      <button
        onClick={() => dispatch({ type: "RESET" })}
        className="btn btn-warning"
        style={{ marginLeft: "2rem" }}
      >
        Reset
      </button>
    </div>
  );
}

export default Timer;
