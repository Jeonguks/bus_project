//format miliseconds to m분s초 

export const formatTime = (timeMilis: number): string => {
  const minutes = Math.floor((timeMilis % 3600000) / 60000);
  const seconds = Math.floor((timeMilis % 60000) / 1000);
  const formattedMinutes = minutes < 1 ? "" : `${minutes}분`;
  const formattedTime = `${formattedMinutes} ${seconds}초`;

  return formattedTime;
};
