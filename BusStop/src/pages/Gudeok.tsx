import GudeokList from "../components/GudeokList"

const Gudeok = ()=>{
    const nowTime = new Date()
    return(
        <>
        <h2>서구5 도착정보</h2>
        {`검색시간: ${nowTime.toLocaleTimeString()}`}
        <GudeokList whereBus={['1']} busTime={['111111']}/>
        </>
    )
}

export default Gudeok