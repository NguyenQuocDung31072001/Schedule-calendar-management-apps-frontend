
import * as React from 'react';
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Appointments,
  Scheduler,
  WeekView,
  DragDropProvider,
  CurrentTimeIndicator,
  EditRecurrenceMenu,
  DateNavigator,
  Toolbar,
  ConfirmationDialog,
  AppointmentForm,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2018-11-01';
const schedulerData = [
  { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
  { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

export default function Schedule() {
  const [state, setState] = React.useState({
    data: schedulerData,
    shadePreviousCells: true,
    shadePreviousAppointments: true,
    updateInterval: 10000,
  })

  const onCommitChanges = (alo) => {
    console.log(alo)
    // let data = state.data
    // if (added) {
    //   const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
    //   data = [...data, { id: startingAddedId, ...added }];
    // }
    // if (changed) {
    //   data = data.map((appointment) => (
    //     changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    // }
    // if (deleted !== undefined) {
    //   data = data.filter((appointment) => appointment.id !== deleted);
    // }
    // setState((prev) => ({
    //   ...prev,
    //   data: data
    // }));
  }

  return (
    <>
      <Scheduler
        data={state.data}
      >
        <ViewState
          defaultCurrentDate={currentDate}
        />
        <EditingState
          onCommitChanges={onCommitChanges}
          // onAddedAppointmentChange={(e) => console.log({ e })}
          appointmentChanges={"helu"}
          onAppointmentChangesChange={(e) => console.log({ e })}
        />
        <IntegratedEditing />
        <ConfirmationDialog />
        <WeekView
          startDayHour={9}
          endDayHour={19}
        />
        <Toolbar />
        <DateNavigator />
        <Appointments />
        <AppointmentTooltip
          showOpenButton
          showDeleteButton
        />
        <AppointmentForm fullSize={true} />

        <DragDropProvider />

        {/* <CurrentTimeIndicator
          shadePreviousCells={state.shadePreviousCells}
          shadePreviousAppointments={state.shadePreviousAppointments}
          updateInterval={state.updateInterval}
        /> */}
      </Scheduler>
    </>
  );

}
