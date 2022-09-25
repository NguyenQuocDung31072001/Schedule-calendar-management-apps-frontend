import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import React from "react";
import "./App.css";
import Scheduler, { AppointmentDragging } from "devextreme-react/scheduler";

import { appointments } from "./data.js";

const currentDate = new Date(2021, 3, 26);

const views: any = [{ type: "day", intervalCount: 7, cellDuration: 10 }];
const draggingGroupName = "appointmentsGroup";

function App() {
  const [data, setData] = React.useState(appointments);

  // const onAppointmentRemove = (e) => {
  //   const index = data.indexOf(e.itemData);

  //   if (index >= 0) {
  //     data.splice(index, 1);

  //     setData(
  //      data
  //     );
  //   }
  // };

  // const onAppointmentAdd = (e) => {

  //   if (index >= 0) {
  //     data.push(e.itemData);

  //     setData({
  //       appointments: [...data],
  //     });
  //   }
  // };
  return (
    <div>
      <Scheduler
        timeZone="Etc/GMT+7"
        id="scheduler"
        dataSource={data}
        views={views}
        defaultCurrentDate={currentDate}
        height={600}
        startDayHour={9}
        editing={true}
      >
        {/* <AppointmentDragging
        group={draggingGroupName}
        onRemove={onAppointmentRemove}
        onAdd={onAppointmentAdd}
      /> */}
      </Scheduler>
    </div>
  );
}

export default App;
