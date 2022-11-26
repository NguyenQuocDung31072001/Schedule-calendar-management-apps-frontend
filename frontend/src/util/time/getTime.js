import dayjs from "dayjs";

export const getTime = (date) => {
  const parseDate = dayjs(date);
  return {
    getDay: parseDate.$D < 10 ? `0${parseDate.$D}` : `${parseDate.$D}`,
    getMonth:
      parseDate.$M + 1 < 10 ? `0${parseDate.$M + 1}` : `${parseDate.$M + 1}`,
    getYear: parseDate.$y,
    getHour: parseDate.$H < 10 ? `0${parseDate.$H}` : `${parseDate.$H}`,
    getMinus: parseDate.$m < 10 ? `0${parseDate.$m}` : `${parseDate.$m}`,
    getHourParseToNumber: parseDate.$H * 3600,
    getMinusParseToNumber: parseDate.$m * 60,
  };
};
