import { useEffect, useState } from "react";

const Test = (props: { initialTime: number; totalDurationTime: number; }) => {
  const initialTimeInSeconds = props.initialTime; //unit : Second

  const totalDurationInSeconds = props.totalDurationTime; //unit : Second
  const [remainingTime, setRemainingTime] = useState(
    totalDurationInSeconds - initialTimeInSeconds
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime: number) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 초를 분과 초로 변환
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <h2>
      다음 배차는 {minutes}분 {seconds}초 후 입니다.
    </h2>
  );
};

export default Test