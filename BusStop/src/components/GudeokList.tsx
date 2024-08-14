import { gudeokData } from "../data/gudeokLists";
import Stops from "./Stops";

const GudeokList = (props: { whereBus: string[]; busTime: string[] }) => {
    return (
      <div className="stopsList-wrapper">
        {gudeokData.map((value, index) => {
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
  
export default GudeokList