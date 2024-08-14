//format seconds  to m분s초 

export const formatTime = (inputSeconds: number): string => {
  const minutes = Math.floor((inputSeconds % 3600) / 60);
  const seconds = Math.floor((inputSeconds % 60));
  const formattedMinutes = minutes < 1 ? "" : `${minutes}분`;
  const formattedTime = `${formattedMinutes} ${seconds}초`;

  return formattedTime; //output : m분 s초 
};
