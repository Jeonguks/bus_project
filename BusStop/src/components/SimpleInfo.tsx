// import { useEffect, useState } from "react";
// // import { calculateTime } from "../utils/calculateTime";
// // import { formatTime } from "../utils/FormatTime";
// //import Test from "./Test";

// const SimpleInfo = (props: { nowTime: string }) => {
//   const [activatedBusCtn, setActivatedBusCtn] = useState(0);
//   const [activatedBusTimes, setActivatedBusTimes] = useState([]);
//   const [activatedBusWhere, setActivatedBusWhere] = useState([]);
//   const [activatedBusStopidx,setActivatedBusStopidx] = useState<string[]>([])
//   const [isTurnning,setIsTurnning] = useState(false)
//   //const [lazyBusTime,setLazyBusTime] = useState(0)
//   //let lazyBusTime = "0";
//   //let calculedTime = 0;
//   useEffect(() => {
//     fetch("http://localhost:8080/getActiveBus", { method: "GET" })
//       .then((res) => res.json())
//       .then((res) => {
//         const result = JSON.parse(res);
//         setActivatedBusCtn(result.activatedBusCtn);
//         setActivatedBusTimes(result.activatedBusTimes);
//         setActivatedBusWhere(result.activatedBusWhere);
//         setActivatedBusStopidx(result.activatedBusStopidx);
//       })
//       .catch((error) => {
//         console.error("Error fetching Data", error);
//       });
//   }, []);

//   if (activatedBusStopidx.includes('15')) {
//     setIsTurnning(true)
//   }
//   return (
//     <div className="simpleInfo-wrapper">
//       {activatedBusCtn === 0 ? (
//         <>
//           <span>현재 운행중인 버스가 없습니다.</span>
//         </>
//       ) : (
//         <>
//           <span>{`지금 ${activatedBusCtn} 대의 버스가 운행중입니다.`}</span>
//           <br />
//           <span>{`실시간 버스위치 : ${activatedBusWhere.join(' ,')} `}</span>
//           {isTurnning? <h4>하단역에서 회차중인 버스가 있습니다.</h4>:""}  
//         </>
//       )}
//       {/* {activatedBusCtn !== 0 &&
//       calculateTime(props.nowTime, activatedBusTimes[0]) >= 180000 ? (
//         <h4>
//           버스는 지금 회차대기중입니다.
//           {`마지막 배차는 ${formatTime(
//             calculateTime(props.nowTime, activatedBusTimes[0])
//           )}전입니다.`}{" "}
//         </h4>
//       ) : (
//         ""
//       )} */}

//       {/* <Test initialTime={calculedTime} totalDurationTime = {20*60}/> */}
//     </div>
//   );
// };

// export default SimpleInfo;
