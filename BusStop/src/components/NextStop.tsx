import { useRef, useState } from "react";
import { formatTime } from "../utils/FormatTime";

const NextStop = () => {
  const [isRunning, setRunning] = useState(false);
  const [time, setTime] = useState(6 * 1000); //unit : miliSeconds
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const startTimer = () => {
    if (!isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          } else {
            return prevTime - 1000;
          }
        });
      }, 1000);
      setRunning(true);
    } else {
      clearInterval(intervalRef.current);
      setRunning(false);
    }
  };
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(6 * 1000);
    setRunning(false);
  };
  return (
    <>
      <span>{formatTime(time) + " 후"}</span>
      <div>
        <button onClick={startTimer}>{isRunning ? "Stop" : "start"}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </>
  );
};
export default NextStop;
//계산식: 이전정류장에서 도착까지의 평균시간 + 검색시간대 평균 배차간격 - 마지막 통과시간
