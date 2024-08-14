import { useParams } from "react-router-dom";
import Header from "../components/Header";
import BackBtn from "../ui/BackBtn";
import NextStop from "../components/NextStop";
import LastStop from "../components/LastStop";
import StopProb from "../components/StopProb";
import { dataSet } from "../data/busStopLists";
import { useEffect, useState } from "react";
import { calculateTimeNow } from "../utils/calculateTime";
import { formatTime } from "../utils/FormatTime";

const Detail = () => {
  const params = useParams();
  const stopIdx = Number(params.id);
  const [activatedBusStopidx, setActivatedBusStopidx] = useState<string[]>([]);
  const [activatedBusTime, setActivatedBusTime] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://sahabus.du.r.appspot.com/getActiveBus", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        const result = JSON.parse(res);
        // setActivatedBusCtn(result.activatedBusCtn);
        setActivatedBusTime(result.activatedBusTime);
        setActivatedBusStopidx(result.activatedBusStopidx);
      })
      .catch((error) => {
        console.error("Error fetching Data", error);
      });
  }, []);

  const isUpper = activatedBusStopidx.some(
    (idx) => Number(idx) >= 1 && Number(idx) < 6
  );
  const isDownner = activatedBusStopidx.some(
    (idx) => Number(idx) >= 7 && Number(idx) <= 15
  );

  const validBusIdx = Math.min(
    ...activatedBusStopidx.map((idx) => Number(idx))
  );
  const validBusIdx2 = Math.max(
    ...activatedBusStopidx.map((idx) => Number(idx))
  );
  const commingBus = Math.max(...activatedBusTime.map((idx) => Number(idx)));

  // const matchBus = (idx:number)=>{
  //   if(idx>=0&&idx<=5){
  //     return 'up'
  //   }else if(idx>=7&&idx<=13){
  //     return 'down'
  //   }else{
  //     return 'wait'
  //   }
  //console.log(validBusIdx)
  //console.log(validBusIdx2)
  //console.log(commingBus)
  //console.log(formatTime(calculateTimeNow(String(commingBus))))
  return (
    <>
      {/* <br />
      {activatedBusTime.join(",")}
      <br />
      {activatedBusStopidx.join(",")}
      <br /> */}
      {/* {isUpper && validBusIdx < stopIdx + 1
        ? `버스가 ${stopIdx - validBusIdx + 1}개의 정류장 앞에 있음`
        : "f"} */}
      <Header />
      <BackBtn />
      <div className="detail-wrapper">
        <div className="detail-title">
          <h3>{dataSet[stopIdx].bstopnm}</h3>
          <h4>{dataSet[stopIdx + 1].bstopnm + " 방향"}</h4>
        </div>
        <div className="detail-info">
          <div>
            다음 도착예정 :{" "}
            {/* {dataSet[stopIdx].avgym == 200
              ? "회차중입니다."
              : dataSet[stopIdx].avgym} */}
            {params.id == "0" && activatedBusStopidx.includes("15") ? (
              <strong>5분후 도착 (1번째전)</strong>
            ) : isDownner && validBusIdx2 < stopIdx + 1 ? (
              <div>
                {formatTime(dataSet[stopIdx].avgym * 1000)}후 도착 (
                {stopIdx - validBusIdx2 + 1}번째 전)
              </div>
            ) : (
              <div>도착예정 버스가 없습니다.</div>
            )}
          </div>
          {/* <NextStop /> */}
          {/* <div>마지막 도착 : </div> */}
          {/* <LastStop /> */}
          {/* <div>5분내 도착확률 : </div> */}
          {/* <StopProb /> */}
        </div>
      </div>
    </>
  );
};

export default Detail;
