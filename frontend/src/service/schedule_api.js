import axiosInstance from "../config/axiosConfig";

export const getAllScheduleQuery = ({ token }) => {
  return axiosInstance.get("/api/courses", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

export const addNewScheduleMutation = ({ title, code, description, startTime, endTime, numOfLessonsPerDay, startDate, endDate, numOfLessons, notiBeforeTime, colorCode, token }) => {
  return axiosInstance.post("/api/courses", {
    title: title,
    code: code,
    description: description,
    startTime: startTime,
    endTime: endTime,
    numOfLessonsPerDay: numOfLessonsPerDay,
    startDate: startDate,
    endDate: endDate,
    numOfLessons: numOfLessons,
    notiBeforeTime: notiBeforeTime,
    colorCode: colorCode
  }, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

export const getAllEventQuery = ({ token, fromDate, toDate }) => {
  return axiosInstance.get(`/api/courses?FromDate=${fromDate}&ToDate=${toDate}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}