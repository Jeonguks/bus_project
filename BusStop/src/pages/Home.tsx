import StopsList from "../components/StopsList";
import Header from "../components/Header";
import SimpleInfo from "../components/SimpleInfo";
import { formatAPITime } from "../utils/formatAPITime";
import BusInfo from "../components/BusInfo";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import RefreshBtn from "../ui/RefreshBtn";



const Home = () => {
  const nowTime = new Date()
  const formattedAPITIME = formatAPITime(nowTime)
  const [whereBus,setWhereBus] = useState<string[]>([])
  const [isModalOpen,setModalOpen] = useState(false)

  const handleModalOpen = ()=>{
    setModalOpen(true)
  }
  const handleModalClose = ()=>{
    setModalOpen(false)
  }
  useEffect(()=>{
    setWhereBus((prev)=> ["하단오거리"])
  },[])
  return (
    <>
      <Header/>
      <SimpleInfo nowTime={formattedAPITIME}/>
      <div className="search-wrapper">
        {`검색시간: ${nowTime.toLocaleTimeString()}`}
      </div>
      {/* <button
        onClick={ async()=>{
          try{
            const response = await fetch('http://localhost:8080/hi')
            if(!response.ok){
              throw new Error(`Response Error: ${response.status}`)
            }
            console.log(response)
          }catch(error){
          console.error(error)}
        }
      }
      >
        운행정보
      </button> */}
      <button onClick={handleModalOpen}>운행정보</button>
      <Modal isModalOpen={isModalOpen} onClose={handleModalClose}>
        <BusInfo/>
      </Modal>
      <div className="content-wrapper">
        <StopsList whereBus={whereBus} />
      </div>
      <RefreshBtn/>
    </>
  );
};

export default Home;
