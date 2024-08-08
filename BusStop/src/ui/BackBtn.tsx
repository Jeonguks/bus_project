import { useNavigate } from "react-router-dom"

const BackBtn = ()=>{
    const navigate = useNavigate()
    return(
        <div onClick={()=>navigate("/")}>뒤로가기</div>
    )
}
export default BackBtn