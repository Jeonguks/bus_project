import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import calculateRemainTime from "../utils/calculateRemainTime";
import { calculateTimeNow } from "../utils/calculateTime";

const NextStop = () => {
  const params = useParams();
  const stopIdx = Number(params.id);
  const [activatedBusStopidx, setActivatedBusStopidx] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [activatedBusTime, setActivatedBusTime] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://sahabus.du.r.appspot.com/getActiveBus", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        const result = JSON.parse(res);
        setActivatedBusTime(result.activatedBusTime);
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
  const lazyBusTime = Math.min(...activatedBusTime.map((idx) => Number(idx)));
  console.log(lazyBusTime)
  console.log("up", upwardIdx);
  console.log("dw", downwardIdx);
  console.log("st", stopIdx);
  console.log(calculateTimeNow(String(lazyBusTime)))

  if(lazyBusTime == Infinity||lazyBusTime == -Infinity){
    return(
      <div>운행중인 버스가 없거나 운행시간이 아닙니다.</div>
    )
  }

  if (stopIdx + 1 == downwardIdx || stopIdx + 1 == upwardIdx) {
    return <div>도착 또는 출발</div>;
  }
  if (stopIdx + 1 > downwardIdx && calculateTimeNow(String(lazyBusTime)) > 60) {
    return <div>도착예정 버스가 없습니다.</div>;
  }
  if (stopIdx == 0) {
    if (downwardIdx == 15) {
      return <div>하단역에서 회차중</div>;
    } else if (downwardIdx >= 8 && downwardIdx <= 14) {
      return (
        <div>
          <strong>
            {formatTime(
              calculateRemainTime(1, stopIdx) +
                calculateRemainTime(downwardIdx, 15)
            )}
          </strong>
          후 도착예정 ({15 - downwardIdx + stopIdx}번째 전)
        </div>
      );
    }
  } else if (stopIdx >= 1 && stopIdx <= 6) {
    if (stopIdx < upwardIdx) {
      return <div>도착예정 버스가 없습니다.</div>;
    } else if (downwardIdx >= 8 && downwardIdx <= 15) {
      return (
        <div>
          {formatTime(calculateRemainTime(upwardIdx, stopIdx + 1))}(
          {stopIdx + 1 - upwardIdx}번째 전)
        </div>
      );
    }
  } else if (stopIdx >= 7 && stopIdx <= 14) {
    if (stopIdx < downwardIdx) {
      return <div>도착예정 버스가 없습니다.</div>;
    }
    return (
      <div>
        {formatTime(calculateRemainTime(downwardIdx, stopIdx + 1))}(
        {stopIdx + 1 - downwardIdx}번째 전)
      </div>
    );
  } else {
    return <div>여기도 하단역</div>;
  }
};
export default NextStop;
