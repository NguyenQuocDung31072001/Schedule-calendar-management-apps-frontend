import { getDetailTime } from "./getDetailTime"

export const getFromDate_ToDate = (_fromDate) => {
  const detailFormDate = getDetailTime(_fromDate)
  let detailToDate = {
    year: detailFormDate.year,
    month: detailFormDate.month,
    day: detailFormDate.day
  }

  switch (detailFormDate.month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      if (detailFormDate.day + 7 > 31 && detailFormDate.month !== 12) {
        detailToDate = {
          ...detailFormDate,
          month: detailFormDate.month + 1,
          day: (detailFormDate.day + 7) - 31
        }
      } else if (detailFormDate.day + 7 > 31 && detailFormDate.month === 12) {
        detailToDate = {
          ...detailFormDate,
          year: detailFormDate.year + 1,
          month: 1,
          day: (detailFormDate.day + 7) - 31
        }
      } else {
        detailToDate = {
          ...detailFormDate,
          month: detailFormDate.month,
          day: detailFormDate.day + 7
        }
      }
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      if (detailFormDate.day + 7 > 30) {
        detailToDate = {
          ...detailFormDate,
          month: detailFormDate.month + 1,
          day: (detailFormDate.day + 7) - 30
        }
      } else {
        detailToDate = {
          ...detailFormDate,
          month: detailFormDate.month,
          day: detailFormDate.day + 7
        }
      }
      break;
    default:
      if ((detailFormDate.year % 4 === 0 && detailFormDate.year % 100 !== 0) || detailFormDate.year % 400 === 0) {
        if (detailFormDate.day + 7 > 29) {
          detailToDate = {
            ...detailFormDate,
            month: detailFormDate.month + 1,
            day: (detailFormDate.day + 7) - 29
          }
        } else {
          detailToDate = {
            ...detailFormDate,
            month: detailFormDate.month,
            day: detailFormDate.day + 7
          }
        }
      } else {
        if (detailFormDate.day + 7 > 28) {
          detailToDate = {
            ...detailFormDate,
            month: detailFormDate.month + 1,
            day: (detailFormDate.day + 7) - 28
          }
        } else {
          detailToDate = {
            ...detailFormDate,
            month: detailFormDate.month,
            day: detailFormDate.day + 7
          }
        }
      }
      break;
  }
  return {
    fromDate: `${detailFormDate.year}-${detailFormDate.month < 10 ? `0${detailFormDate.month}` : detailFormDate.month}-${detailFormDate.day}`,
    toDate: `${detailToDate.year}-${detailToDate.month < 10 ? `0${detailToDate.month}` : detailToDate.month}-${detailToDate.day}`
  }
}
