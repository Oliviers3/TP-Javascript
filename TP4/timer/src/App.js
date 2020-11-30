import React, { useState, useEffect } from 'react';
import css from './App.css';
import SevenSegmentDisplay from "./react-seven-segment-display";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setMinutes(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);   
        if(seconds == 59){
            setMinutes(minutes=> minutes + 1);
            setSeconds(0);
            if(minutes == 99 && seconds == 59){
                setMinutes(0);
                setSeconds(0);
            }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0 && minutes !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  return (
    <div className="app">
      <div className="time">
      {minutes}min : {seconds}s
      </div>
      <div className="row">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;