import { EnumTypeCalendar } from "../interface/enum";

export const ScheduleData=[
  {
    title: "Môn toán 1",
    startDate: new Date(2018, 5, 25, 12, 35),
    endDate: new Date(2018, 5, 25, 15, 0),
    type:EnumTypeCalendar.Schedule,
    id: 0,
    room: [3],
    subject: [1],
  },
  {
    title: "Môn lập trình",
    startDate: new Date(2018, 5, 25, 12, 35),
    endDate: new Date(2018, 5, 25, 15, 0),
    type:EnumTypeCalendar.Schedule,
    id: 1,
    subject: [3],
    room: [2],
  },
  {
    title: "Môn Web",
    startDate: new Date(2018, 5, 25, 12, 35),
    endDate: new Date(2018, 5, 25, 15, 0),
    type:EnumTypeCalendar.Task,
    id: 2,
    subject: [4],
    room: [2],
  },
]