import StopsList from "../components/StopsList";

import Header from "../components/Header";
import SimpleInfo from "../components/SimpleInfo";
import { formatAPITime } from "../utils/formatAPITime";
import BusInfo from "../components/BusInfo";

const Home = () => {
  const nowTime = new Date()
  const formattedAPITIME = formatAPITime(nowTime)
  return (
    <>
      <Header/>
      <SimpleInfo nowTime={formattedAPITIME}/>
      <div>
        {`검색시간: ${nowTime.toLocaleTimeString()}`}
        <button onClick={() => location.reload()}>새로고침</button>
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
      <BusInfo/>
      <div className="content-wrapper">
        <div className="tap-wrapper">
          <a href="#">전체보기</a>
          <a href="#">생활관행</a>
          <a href="#">하단역행</a>
        </div>
        <StopsList />
      </div>
      {/* <button onClick={()=>{setModalOpen(true)}}>modal open</button> */}
      {/* <Modal isOpen={isModalOpen} setModalOpen={setModalOpen}/> */}
    </>
  );
};

export default Home;
