import { formatAPITime } from "./formatAPITime";

const parseTimeToDate = (time: string) => {
    //hhmmss to miliseconds
  const hours = parseInt(time.substring(0, 2), 10);
  const minutes = parseInt(time.substring(2, 4), 10);
  const seconds = parseInt(time.substring(4, 6), 10);

  return ((hours*3600)+(minutes*60)+(seconds))*1000
};

export const calculateTimeNow = (time:string)=>{
  const date1 = parseTimeToDate(time);
  const nowTime = parseTimeToDate(formatAPITime(new Date()))

  const differenceMiliSeconds = Math.abs(nowTime - date1);

  return differenceMiliSeconds; //Output : MiliSeconds
}

export const calculateTime = (prevTime: string, nextTime: string)=> {
    //Input : hhmmss 
  const date1 = parseTimeToDate(prevTime);
  const date2 = parseTimeToDate(nextTime);

  const differenceMiliSeconds = Math.abs(date1- date2);

  return differenceMiliSeconds; //Output : miliseconds
}