import { IoIosRefresh } from "react-icons/io";

const RefreshBtn = ()=>{
    return(
        <IoIosRefresh className="refresh-button" size={40} color="#ccc" onClick={() => location.reload()}/>
    )
}

export default RefreshBtn
