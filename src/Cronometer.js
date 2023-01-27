import React, { useState, useEffect } from 'react';


function Cronometer(props) {
    const [time, setTime] = useState(0);
    let intervalId;
  
    useEffect(() => {
      if (props.isRunning) {
        intervalId = setInterval(() => {
          setTime(time => time + 1);
        }, 10);
      }
      return () => clearInterval(intervalId);
    }, [props.isRunning]);
  
    // formatting the time
    const minutes = String(Math.floor(time / 6000)).padStart(2, '0');
    const seconds = String(Math.floor(time / 100) % 60).padStart(2, '0');
    const milliseconds = String(time % 100).padStart(2, '0');

  
    return (
      <div>
        <div>{`${minutes}:${seconds}:${milliseconds}`}</div>
      </div>
    );
  }
  
  export default Cronometer;