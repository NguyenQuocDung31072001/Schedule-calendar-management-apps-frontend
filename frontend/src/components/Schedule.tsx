import React from "react";
import Scheduler, { Resource } from "devextreme-react/scheduler";

import { subjectData, taskData, data } from "../data";

const currentDate = new Date(2021, 1, 2);
const groups = ["priority"];
const views: any = [
  "agenda",
  "month",
  "week",
  "day",
  //   { type: "day", intervalCount: 7, cellDuration: 15 },
];
const Schedule = () => {
  const [dataSchedule, setDataSchedule] = React.useState(data);
  return (
    <div>
      <Scheduler
        timeZone="Etc/GMT+7"
        id="scheduler"
        dataSource={dataSchedule}
        views={views}
        defaultCurrentView="timelineMonth"
        defaultCurrentDate={currentDate}
        groups={groups}
        cellDuration={60}
        firstDayOfWeek={0}
        height={600}
        startDayHour={1}
        editing={true}
      >
        <Resource
          fieldExpr="subject"
          allowMultiple={true}
          dataSource={subjectData}
          label="Subject"
          useColorAsDefault={true}
        />
        <Resource
          fieldExpr="task"
          allowMultiple={true}
          dataSource={taskData}
          label="Task"
        />
      </Scheduler>
    </div>
  );
};

export default Schedule;
