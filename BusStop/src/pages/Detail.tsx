import { useParams } from "react-router-dom";
import Header from "../components/Header";
import BackBtn from "../ui/BackBtn";
//import NextStop from "../components/NextStop";
//import LastStop from "../components/LastStop";
//import StopProb from "../components/StopProb";
import { dataSet } from "../data/busStopLists";
import { useEffect, useState } from "react";
//import { calculateTimeNow } from "../utils/calculateTime";
import { formatTime } from "../utils/FormatTime";
import calculateRemainTime from "../utils/calculateRemainTime";

const Detail = () => {
  const params = useParams();
  const stopIdx = Number(params.id);
  const [activatedBusStopidx, setActivatedBusStopidx] = useState<string[]>([]);
  //const [activatedBusTime, setActivatedBusTime] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://sahabus.du.r.appspot.com/getActiveBus", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        const result = JSON.parse(res);
        // setActivatedBusCtn(result.activatedBusCtn);
      //  setActivatedBusTime(result.activatedBusTime);
        setActivatedBusStopidx(result.activatedBusStopidx);
      })
      .catch((error) => {
        console.error("Error fetching Data", error);
      });
  }, []);

  const validBusIdx = Math.min(
    ...activatedBusStopidx.map((idx) => Number(idx))
  );

  return (
    <>
      <Header />
      <BackBtn />
      <div className="detail-wrapper">
        <div className="detail-title">
          <h3>{dataSet[stopIdx].bstopnm}</h3>
          <h4>{dataSet[stopIdx + 1].bstopnm + " 방향"}</h4>
        </div>
        <div className="detail-info">
          {stopIdx < 5 ? (
            <div>
              {formatTime(calculateRemainTime(validBusIdx, stopIdx + 1) * 1000)}
              ({stopIdx+1-validBusIdx}번째 전)
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Detail;
