import "../App.css"
import Stops from "./Stops";
import { dataSet } from "../data/busStopLists"; 

const StopsList = () => {
  return (
    <div className="stopsList-wrapper">
      {dataSet.map((e, i) => {
        return <Stops key={i} stopIdx={String(i)} stopName={e.bstopnm} />;
      })}
    </div>
  );
};

export default StopsList;
