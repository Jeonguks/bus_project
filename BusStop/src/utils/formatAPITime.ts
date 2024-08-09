export const formatAPITime = (nowTime: Date) => {
  const hours = nowTime.getHours();
  const minutes = nowTime.getMinutes();
  const seconds = nowTime.getSeconds();

  const formattedTime = String(hours) + String(minutes) + String(seconds);

  return formattedTime;
};
