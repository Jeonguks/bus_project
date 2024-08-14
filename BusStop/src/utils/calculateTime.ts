export const parseTimeToSeconds = (time: string) => {
    //hhmmss to Seconds
  const hours = parseInt(time.substring(0, 2), 10);
  const minutes = parseInt(time.substring(2, 4), 10);
  const seconds = parseInt(time.substring(4, 6), 10);

  return ((hours*3600)+(minutes*60)+(seconds)) //Output : Seconds
};

export const calculateTime = (prevTime: string, nextTime: string)=> {
    //Input : hhmmss 
  const time1 = parseTimeToSeconds(prevTime);
  const time2 = parseTimeToSeconds(nextTime);

  return Math.abs(time2- time1);//Output : Seconds
}

export const calculateTimeNow = (prevTime : string)=>{
    //Input : hhmmss
  const time1 = parseTimeToSeconds(prevTime)
  const hours = new Date().getHours()
  const minutes = new Date().getMinutes()
  const seconds = new Date().getSeconds()
  const nowTime = ((hours*3600)+(minutes*60)+(seconds))

  return Math.abs(nowTime- time1);//Output : Seconds
}