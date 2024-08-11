//import { useNavigate } from "react-router-dom";
import { RiBus2Line } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";

const Stops = (props: {
  stopName: string;
  stopIdx: number;
  isStop: boolean;
}) => {
  //const navigate = useNavigate();
  const onClick = () => {
    alert("Test중입니다.")
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
              <RiBus2Line color="blue" width={"20px"} height={"20px"} />
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
