import { useRef, useState } from "react";
import { formatTime } from "../utils/FormatTime";

const LastStop = () => {
  const [isRunning, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const startCount = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
      setRunning(true);
    } else {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  };
  const resetCount = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
  };
  return (
    <>
      <span>{formatTime(time) + " 전"}</span>
      <div>
          <button onClick={startCount}>{isRunning ? "Stop" : "start"}</button>
          <button onClick={resetCount}>Reset</button>
      </div>
    </>
  );
};

export default LastStop;
