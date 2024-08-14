import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import calculateRemainTime from "../utils/calculateRemainTime";

const NextStop = () => {
  const params = useParams();
  const stopIdx = Number(params.id);
  const [activatedBusStopidx, setActivatedBusStopidx] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  //const [activatedBusTime, setActivatedBusTime] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://sahabus.du.r.appspot.com/getActiveBus", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        const result = JSON.parse(res);
        //setActivatedBusTime(result.activatedBusTime);
        setActivatedBusStopidx(result.activatedBusStopidx);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Data", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const upwardIdx = Math.min(...activatedBusStopidx.map((idx) => Number(idx)));
  const downwardIdx = Math.max(
    ...activatedBusStopidx.map((idx) => Number(idx))
  );
  console.log(upwardIdx);
  console.log(downwardIdx);
  return (
    <div className="nextStop-wrapper">
      {stopIdx>0 && stopIdx < 5 &&
        (stopIdx + 1 - upwardIdx === 0 ? (
          <div>도착 또는 출발</div>
        ) : (
          <div>
            {formatTime(calculateRemainTime(upwardIdx, stopIdx + 1))}(
            {stopIdx + 1 - upwardIdx}번째 전)
          </div>
        ))}
      {stopIdx > 6 &&
        (stopIdx + 1 - downwardIdx === 0 ? (
          <div>도착 또는 출발</div>
        ) : (
          <div>
            {formatTime(calculateRemainTime(downwardIdx, stopIdx + 1))}(
            {stopIdx + 1 - downwardIdx}번째 전)
          </div>
        ))}
      {stopIdx == 0 &&
        (downwardIdx === 15 ? (
          <div>하단역에서 회차중</div>
        ) : (
          <div>
            
          </div>
        ))}
    </div>
  );
};
export default NextStop;
