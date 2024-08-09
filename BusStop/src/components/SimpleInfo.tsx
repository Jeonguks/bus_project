import { useEffect, useState } from "react";
import { calculateTime } from "../utils/calculateTime";
import { formatTime } from "../utils/FormatTime";

const SimpleInfo = (props: { nowTime: string }) => {
  const [activeBusCtn, setActiveBusCtn] = useState(0);
  const [activeBusTimes, setActiveBusTimes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/getActiveBus", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        const result = JSON.parse(res);
        setActiveBusCtn(result.activatedBusCtn);
        setActiveBusTimes(result.activatedBusTime);
      })
      .catch((error) => {
        console.error("Error fetching Data", error);
      });
  }, []);
  return (
    <div className="simpleInfo-wrapper">
      {activeBusCtn === 0 ? (
        <span>현재 운행중인 버스가 없습니다.</span>
      ) : (
        <span>{`지금 ${activeBusCtn} 대의 버스가 운행중입니다.`}</span>
      )}
      {activeBusCtn !== 0 &&
      calculateTime(props.nowTime, activeBusTimes[0]) >= 180000 ? (
        <h4>
          {parseInt(props.nowTime) - parseInt(activeBusTimes[0])}
          {`마지막 배차는 ${formatTime(
            calculateTime(props.nowTime, activeBusTimes[0])
          )}전입니다.`}{" "}
        </h4>
      ) : (
        ""
      )}
    </div>
  );
};

export default SimpleInfo;
