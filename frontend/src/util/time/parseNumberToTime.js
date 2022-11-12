export function parseNumberToTime(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  if (m > 0) {
    return (h < 10 ? `0${h}` : h) + ":" + (m < 10 ? `0${m}` : m);
  } else {
    return (h < 10 ? `0${h}` : h) + ":00";
  }
}

export const getDetailTimeFormNumber = (date) => {
  date = Number(date);
  const h = Math.floor(date / 3600);
  const m = Math.floor((date % 3600) / 60);
  return {
    H: h < 10 ? `0${h}` : h,
    M: m < 10 ? `0${m}` : m,
  };
};
