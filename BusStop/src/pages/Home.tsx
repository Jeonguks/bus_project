import StopsList from "../components/StopsList";
import Header from "../components/Header";
// import SimpleInfo from "../components/SimpleInfo";
// import { formatAPITime } from "../utils/formatAPITime";
import BusInfo from "../components/BusInfo";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const nowTime = new Date()
  //const formattedAPITIME = formatAPITime(nowTime)
  const [activatedBusStopidx,setActivatedBusStopidx] = useState<string[]>([])
  const [activatedBusTime,setActivatedBusTime] = useState<string[]>([])
  const [isModalOpen,setModalOpen] = useState(false)
  const nav = useNavigate();
  const handleModalOpen = ()=>{
    setModalOpen(true)
  }
  const handleModalClose = ()=>{
    setModalOpen(false)
  }
  useEffect(() => {
    fetch("https://sahabus.du.r.appspot.com/getActiveBus", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        const result = JSON.parse(res);
        // setActivatedBusCtn(result.activatedBusCtn);
        setActivatedBusTime(result.activatedBusTime);
        setActivatedBusStopidx(result.activatedBusStopidx);
      })
      .catch((error) => {
        console.error("Error fetching Data", error);
      });
  }, []);
  return (
    <>
      <Header/>
      {/* <SimpleInfo nowTime={formattedAPITIME}/> */}
      <div className="search-wrapper">
        {`검색시간: ${nowTime.toLocaleTimeString()}`}
      </div>
      <button onClick={handleModalOpen}>운행정보</button>
      <button onClick={()=>nav('/test')}>회차정보</button>
      <Modal isModalOpen={isModalOpen} onClose={handleModalClose}>
        <BusInfo/>
      </Modal>
      <div className="content-wrapper">
        <StopsList whereBus={activatedBusStopidx} busTime={activatedBusTime} />
      </div>
    </>
  );
};

export default Home;
