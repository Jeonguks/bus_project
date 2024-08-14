const Header=()=>{
    const nowTime = new Date()
    return(
        <header>
            <h2>사하10 도착정보</h2>
            {`검색시간: ${nowTime.toLocaleTimeString()}`}
        </header>
    )
}
export default Header