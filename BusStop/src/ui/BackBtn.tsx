import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <IoMdArrowRoundBack className="back-button" size={30} color="gray" onClick={() => navigate("/")} />
  );
};
export default BackBtn;
