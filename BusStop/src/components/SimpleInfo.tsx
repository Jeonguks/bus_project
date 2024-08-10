import { useEffect, useState } from "react";
import { calculateTime } from "../utils/calculateTime";
import { formatTime } from "../utils/FormatTime";
//import Test from "./Test";



const SimpleInfo = (props: { nowTime: string }) => {
  const [activeBusCtn, setActiveBusCtn] = useState(0);
  const [activeBusTimes, setActiveBusTimes] = useState([]);
  const [activeBusWhere, setActiveBusWhere] = useState([]);
  //const [lazyBusTime,setLazyBusTime] = useState(0)
  //let lazyBusTime = "0";
  //let calculedTime = 0;
  useEffect(() => {
    fetch("http://localhost:8080/getActiveBus", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        const result = JSON.parse(res);
        setActiveBusCtn(result.activatedBusCtn);
        setActiveBusTimes(result.activatedBusTime);
        setActiveBusWhere(result.activatedBusWhere);
      })
      .catch((error) => {
        console.error("Error fetching Data", error);
      });
  }, []);

  if (activeBusCtn >= 2) {
    //lazyBusTime = String(Math.min(...activeBusTimes));
    //calculedTime = calculateTime( props.nowTime, activeBusTimes[0]) /1000
  }
  return (
    <div className="simpleInfo-wrapper">
      {activeBusCtn === 0 ? (
        <>
        <span>현재 운행중인 버스가 없습니다.</span>
        <div>운행정보 ? </div>
        
        </>
      ) : (
        <>
        <span>{`지금 ${activeBusCtn} 대의 버스가 운행중입니다.`}</span><br/>
        <span>{`실시간 버스위치 : ${activeBusWhere[0]} `}</span>
        </>
      )}
      {activeBusCtn !== 0 &&
      calculateTime(props.nowTime, activeBusTimes[0]) >= 180000 ? (
        <h4>
          버스는 지금 회차대기중입니다.
          {`마지막 배차는 ${formatTime(
            calculateTime(props.nowTime, activeBusTimes[0])
          )}전입니다.`}{" "}
        </h4>
      ) : (
        ""
      )}

      {/* <Test initialTime={calculedTime} totalDurationTime = {20*60}/> */}
    </div>
  );
};

export default SimpleInfo;
