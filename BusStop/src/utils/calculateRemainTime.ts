import { dataSet } from "../data/busStopLists"

const calculateRemainTime=(prevStopIdx:number,nextStopIdx:number)=>{
    let sum = 0
    if(prevStopIdx===15){
        return 200;
    }
    for(prevStopIdx;prevStopIdx<nextStopIdx;prevStopIdx++){
        sum += dataSet[prevStopIdx].avgym
        console.log(sum)
    }
    return sum //output: seconds
}
export default calculateRemainTime