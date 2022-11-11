export const parseTimeToNumber = (time) => {
  return Number(time.$H * 3600 + time.$m * 60);
};
