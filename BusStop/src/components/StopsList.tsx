import "../App.css";
import Stops from "./Stops";
import { dataSet } from "../data/busStopLists";

const StopsList = (props: { whereBus: string[]; busTime: string[] }) => {
  return (
    <div className="stopsList-wrapper">
      {dataSet.map((value, index) => {
        const stopIdx = props.whereBus.indexOf(value.bstopidx);
        let isStop = false;
        let busTime = "";
        if (stopIdx !== -1) {
          isStop = true;
          busTime = props.busTime[stopIdx];
        }
        return (
          <Stops
            key={index}
            stopIdx={index}
            stopName={value.bstopnm}
            stopTime={busTime}
            isStop={isStop}
          />
        );
      })}
    </div>
  );
};

export default StopsList;
