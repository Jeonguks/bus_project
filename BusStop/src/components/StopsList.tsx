import "../App.css";
import Stops from "./Stops";
import { dataSet } from "../data/busStopLists";

const StopsList = (props: { whereBus: string[] }) => {

  return (
    <div className="stopsList-wrapper">
      {dataSet.map((value, index) => {
        const isStop = props.whereBus.includes(value.bstopnm);
        return (
          <Stops
            key={index}
            stopIdx={String(index)}
            stopName={value.bstopnm}
            isStop={isStop}
          />
        );
      })}
    </div>
  );
};

export default StopsList;
