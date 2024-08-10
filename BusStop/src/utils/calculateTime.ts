const parseTimeToDate = (time: string) => {
    //hhmmss format time to Date Object
  const hours = parseInt(time.substring(0, 2), 10);
  const minutes = parseInt(time.substring(2, 4), 10);
  const seconds = parseInt(time.substring(4, 6), 10);

  return new Date(1970, 0, 1, hours, minutes, seconds);
};

export const calculateTime = (prevTime: string, nextTime: string)=> {
    //Input : hhmmss 
  const date1 = parseTimeToDate(prevTime);
  const date2 = parseTimeToDate(nextTime);

  const differenceMiliSeconds = Math.abs(date1.getTime() - date2.getTime());

  return differenceMiliSeconds; //Output : miliseconds
}