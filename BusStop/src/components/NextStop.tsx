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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://sahabus.du.r.appspot.com/getActiveBus", { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          console.log("eerorrrror");
          throw new Error(`HTTP ERROR Status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        try {
          const result = JSON.parse(res);
          setActivatedBusTime(result.activatedBusTime || []);
          setActivatedBusStopidx(result.activatedBusStopidx || []);
        } catch (parseError) {
          throw new Error("Failed to parse response");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Data", error.message);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if(error){
    return <div>오류가 발생하였습니다.</div>
  }
  const upwardIdx = Math.min(...activatedBusStopidx.map((idx) => Number(idx)));
  const downwardIdx = Math.max(
    ...activatedBusStopidx.map((idx) => Number(idx))
  );
  const lazyBusTime = Math.min(...activatedBusTime.map((idx) => Number(idx)));
  // console.log(lazyBusTime);
  // console.log("up", upwardIdx);
  // console.log("dw", downwardIdx);
  // console.log("st", stopIdx);
  // console.log(calculateTimeNow(String(lazyBusTime)));

  if (lazyBusTime == Infinity || lazyBusTime == -Infinity) {
    return <div>운행중인 버스가 없거나 운행시간이 아닙니다.</div>;
  }

  if (
    (stopIdx + 1 == downwardIdx || stopIdx + 1 == upwardIdx) &&
    stopIdx != 5
  ) {
    return <div>도착 또는 출발</div>;
  }

  if (stopIdx == 0) {
    //하단역 검색
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
    } else {
      return <div>도착예정 버스가 없습니다.</div>;
    }
  } else if (stopIdx >= 1 && stopIdx < 6) {
    //하단오거리~ 공과대학
    if (stopIdx < downwardIdx) {
      if (stopIdx >= upwardIdx) {
        return (
          <div>
            {formatTime(calculateRemainTime(upwardIdx, stopIdx))}후 도착예정 (
            {stopIdx - upwardIdx + 1}번째 전)
          </div>
        );
      } else {
        return (
          <div>
            {formatTime(
              calculateRemainTime(0, stopIdx) +
                calculateRemainTime(downwardIdx, 15)
            )}
            후 도착예정 ({15 - downwardIdx + stopIdx}번째 전)
          </div>
        );
      }
    }
  } else if (stopIdx == 6) {
    //생활관
    return <div>배차대기중</div>;
  } else if (stopIdx >= 7 && stopIdx <= 14) {
    // 산학협력관 ~ 하단역
    if (stopIdx > downwardIdx) {
      if (calculateTimeNow(String(lazyBusTime)) > 300) {
        return <div>도착예정 버스가 없습니다.</div>;
      }
      return (
        <div>
          {formatTime(calculateRemainTime(downwardIdx, stopIdx))}후 도착예정 (
          {stopIdx - downwardIdx}번째 전)
        </div>
      );
    } else if (stopIdx == downwardIdx) {
      return <div>도착 또는 출발</div>;
    } else {
      return <div>도착예정 버스가 없습니다.</div>;
    }
  }
};
export default NextStop;
