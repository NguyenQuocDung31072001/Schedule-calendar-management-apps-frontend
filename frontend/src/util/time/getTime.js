import dayjs from "dayjs";

export const getTime = (date) => {
  const parseDate = dayjs(date);
  return {
    getDay: parseDate.$D,
    getMonth: parseDate.$M + 1,
    getYear: parseDate.$y,
    getHour: parseDate.$H,
    getMinus: parseDate.$m,
    getHourParseToNumber: parseDate.$H * 3600,
    getMinusParseToNumber: parseDate.$m * 60,
  };
};
