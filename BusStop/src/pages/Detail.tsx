import { useParams } from "react-router-dom";
import Header from "../components/Header";
import BackBtn from "../ui/BackBtn";
import NextStop from "../components/NextStop";
import LastStop from "../components/LastStop";
import StopProb from "../components/StopProb";
import { dataSet } from "../data/busStopLists";

const Detail = () => {
  const params = useParams();
  const stopIdx = Number(params.id);
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
          <div>
            다음 도착예정 :{" "}
            {dataSet[stopIdx].avgym == 200
              ? "회차중입니다."
              : dataSet[stopIdx].avgym}
          </div>
          <NextStop />
          <div>마지막 도착 : </div>
          <LastStop />
          <div>5분내 도착확률 : </div>
          <StopProb />
        </div>
      </div>
    </>
  );
};

export default Detail;
