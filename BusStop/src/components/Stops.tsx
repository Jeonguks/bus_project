//import { useNavigate } from "react-router-dom";
import { RiBus2Line } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import { calculateTimeNow } from "../utils/calculateTime";
import { formatTime } from "../utils/FormatTime";

const Stops = (props: {
  stopName: string;
  stopIdx: number;
  isStop: boolean;
  stopTime: string;
}) => {
  //const navigate = useNavigate();
  const onClick = () => {
    if(props.stopTime ==""){
      alert("test중입니다.")
    }else{
      alert(`이 버스는 ${formatTime(calculateTimeNow(props.stopTime))}째 여기에 있습니다.`);
    }
    // console.log(calculateTimeNow(props.stopTime));
    // if (props.stopIdx == 14) {
    //   navigate("detail/0");
    // } else {
    //   navigate(`detail/${props.stopIdx}`);
    // }
  };
  return (
    <>
      <div className="stops-wrapper">
        <div className="stops" onClick={onClick}>
          <div className="stops-icon">
            {props.isStop ? (
              calculateTimeNow(props.stopTime) < 300000 ? (
                <RiBus2Line color="blue" width={"20px"} height={"20px"} />
              ) : (
                <RiBus2Line color="red" width={"20px"} height={"20px"} />
              )
            ) : (
              <IoIosArrowDropdown color="#ccc" />
            )}
          </div>
          <div className="stops-name">{props.stopName}</div>
        </div>
      </div>
    </>
  );
};

export default Stops;
