import React, { useState, useEffect } from 'react';
import './Clock.css'

function Clock() {
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // Function to update the current time
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    // Update time immediately upon mounting
    updateTime();

    // Set an interval to update time every second
    const intervalId = setInterval(updateTime, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
      <div id='clockDiv'>{currentTime}</div>
  );
}

export default Clock;
