import React, { useState, useEffect, useRef } from "react";

import "./App.css";

function setDefaultValue() {
  const userCount = localStorage.getItem("count");
  return userCount ? +userCount : 0;
}

function Timer() {
  const [count, setCount] = useState(setDefaultValue());
  const [isCounting, setIsCounting] = useState(false);
  const timerIdRef = useRef(null);

const handleStart = () => {
    setIsCounting(true);
  };

  const handleStop = () => {
    setIsCounting(false);
  };

  const handleReset = () => {
    setCount(0);
    setIsCounting(false);
  };

  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  useEffect(() => {
    if (isCounting) {
      timerIdRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }   
    return () => clearInterval(timerIdRef.current);
  }, [isCounting]);

  return (
    <div className="timer">
      <h1>React Timer hooks</h1>
      <h2>{count}</h2>
      {!isCounting ? (
        <button onClick={handleStart} className="btn btn-primary">
          Start
        </button>
      ) : (
        <button onClick={handleStop} className="btn btn-danger">
          Stop
        </button>
      )}

      <button
        onClick={handleReset}
        className="btn btn-warning"
        style={{ marginLeft: "2rem" }}
      >
        Reset
      </button>
    </div>
  );
}

export default Timer;
