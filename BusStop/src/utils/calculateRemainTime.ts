import { dataSet } from "../data/busStopLists"

const calculateRemainTime=(prevStopIdx:number,nextStopIdx:number)=>{
    let sum = 0
    for(prevStopIdx;prevStopIdx<=nextStopIdx;prevStopIdx++){
        sum += dataSet[prevStopIdx].avgym
    }
    return sum
}
export default calculateRemainTime