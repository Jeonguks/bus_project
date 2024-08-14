import { useParams } from "react-router-dom";
import Header from "../components/Header";
import BackBtn from "../ui/BackBtn";
import { dataSet } from "../data/busStopLists";
import NextStop from "../components/NextStop";

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
          <NextStop />
        </div>
      </div>
    </>
  );
};

export default Detail;
