import { useEffect, useState } from "react";
import BackBtn from "../ui/BackBtn";
import Header from "../components/Header";

const TestPage = () => {
  const [activatedBusTimes, setActivatedBusTimes] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://sahabus.du.r.appspot.com/getActiveBus", { method: "GET" })
      .then((res) => res.json())
      .then((result) => {
        const data = JSON.parse(result);
        setActivatedBusTimes(data.activatedBusTime);
      })
      .catch((error) => {
        console.error("Error fetching Data", error);
      });
  }, []);

  const lazyBusTime = Math.min(...activatedBusTimes.map(Number));

  return lazyBusTime != Infinity ? (
    <>
      <Header/>
      <BackBtn />
      <div className="test-wrapper">
        <h3>회차 대기중 버스 정보</h3>
        <span>마지막으로 대기를 시작한 버스정보는 다음과 같습니다.</span>
        <br />
        <br />
        <h3>
          {`${String(lazyBusTime).substring(0, 2)}시
                ${String(lazyBusTime).substring(2, 4)}분
                ${String(lazyBusTime).substring(4, 6)}초`}
          <br />
        </h3>
        <br />
        <span>
          보통 버스의 배차간격은 <br />
          <strong>10분,15분,20분,30분</strong> 중 하나입니다.
        </span>
        <br />
        <br />
        <span>
          기숙사에서 출발한 버스는 하단역 도착 까지 보통
          <br />
          <strong>15분</strong> 정도 소요됩니다.
        </span>
      </div>
    </>
  ) : (
    <>
      <BackBtn />
      <h2>운행중인 버스가 없습니다. </h2>
    </>
  );
};

export default TestPage;
