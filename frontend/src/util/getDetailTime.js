import dayjs from "dayjs"
export const getDetailTime = (moment) => {
  const parseDate = new Date(dayjs(moment).$d)
  return {
    day: parseDate.getDate(),
    month: parseDate.getMonth() + 1,
    year: parseDate.getFullYear(),
    hours: parseDate.getHours(),
    minutes: parseDate.getMinutes()
  }
}