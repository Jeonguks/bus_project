import { useNavigate } from "react-router-dom";

const Stops = (props: { stopIdx: string; stopName: string }) => {
  const navigate = useNavigate();
  const onClick = () => {
    if (Number(props.stopIdx) == 14) {
      navigate("detail/0");
    } else {
      navigate(`detail/${props.stopIdx}`);
    }
  };
  return (
    <>
      <div className="stops-wrapper">
        <div className="stops" onClick={onClick}>
          <div className="stops-icon"></div>
          <div className="stops-name">{props.stopName}</div>
        </div>
      </div>
    </>
  );
};

export default Stops;
