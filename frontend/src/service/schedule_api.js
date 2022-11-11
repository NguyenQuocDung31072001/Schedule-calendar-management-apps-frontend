import axiosInstance from "../config/axiosConfig";

export const getAllCoursesQuery = ({ token }) => {
  return axiosInstance.get("/api/courses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addNewCoursesMutation = ({
  title,
  code,
  description,
  startTime,
  endTime,
  dayOfWeeks,
  numOfLessonsPerDay,
  startDate,
  endDate,
  numOfLessons,
  notiBeforeTime,
  colorCode,
  token,
}) => {
  return axiosInstance.post(
    "/api/courses",
    {
      title: title,
      code: code,
      description: description,
      startTime: startTime,
      endTime: endTime,
      dayOfWeeks: dayOfWeeks,
      numOfLessonsPerDay: numOfLessonsPerDay,
      startDate: startDate,
      endDate: endDate,
      numOfLessons: numOfLessons,
      notiBeforeTime: notiBeforeTime,
      colorCode: colorCode,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateCoursesMutation = async ({
  id,
  title,
  code,
  description,
  startTime,
  endTime,
  numOfLessonsPerDay,
  dayOfWeeks,
  startDate,
  endDate,
  numOfLessons,
  notiBeforeTime,
  colorCode,
  token,
}) => {
  return await axiosInstance.put(
    `/api/courses/${id}`,
    {
      title: title,
      code: code,
      description: description,
      startTime: startTime,
      endTime: endTime,
      numOfLessonsPerDay: numOfLessonsPerDay,
      dayOfWeeks: dayOfWeeks,
      startDate: startDate,
      endDate: endDate,
      numOfLessons: numOfLessons,
      notiBeforeTime: notiBeforeTime,
      colorCode: colorCode,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const deleteCoursesMutation = ({ id, token }) => {
  return axiosInstance.delete(`/api/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAllEventQuery = ({ token, fromDate, toDate }) => {
  return axiosInstance.get(
    `/api/courses?FromDate=${fromDate}&ToDate=${toDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
