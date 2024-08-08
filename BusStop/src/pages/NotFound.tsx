import { Link } from "react-router-dom"

const NotFound = ()=>{
    return(
        <>
            <h2>잘못된 접근입니다.</h2>
            <Link to="">Home으로 이동</Link>
        </>
    )
}

export default NotFound