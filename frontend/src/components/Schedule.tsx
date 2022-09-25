import React from "react";
import Scheduler, { Resource } from "devextreme-react/scheduler";

import { resourcesData, priorityData, data } from "../data.js";

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
          fieldExpr="ownerId"
          allowMultiple={true}
          dataSource={resourcesData}
          label="Owner"
          useColorAsDefault={true}
        />
        <Resource
          fieldExpr="priority"
          allowMultiple={false}
          dataSource={priorityData}
          label="Priority"
        />
      </Scheduler>
    </div>
  );
};

export default Schedule;
