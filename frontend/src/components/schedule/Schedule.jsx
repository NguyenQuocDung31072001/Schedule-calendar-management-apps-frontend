import * as React from "react";

//dx-react-scheduler-material-ui
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  DayView,
  DateNavigator,
  TodayButton,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";

//material component
import {
  Paper,
} from "@mui/material";

//material icon
import AddIcon from "@mui/icons-material/Add";

// common component
import { StyledFab, classes } from "./common";

//component
import { ScheduleFormAppointment } from "./form/index";

//data fake
import { CurrentDate, TaskData } from "../../fake_data/index";

import { EnumTypeAppointment, EnumTypeCalendar } from "../../interface/enum";
import { Resource } from "../../fake_data/Resource";
import { ScheduleData } from "../../fake_data/Schedule";

const currentDate = CurrentDate;
const startDayHour = 9;
const endDayHour = 19;

export default function Schedule() {
  //data || hook get data
  const [dataRender, setDateRender] = React.useState([]);
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [deletedAppointmentId, setDeletedAppointmentId] = React.useState();
  const [editingAppointment, setEditingAppointment] = React.useState();
  const [previousAppointment, setPreviousAppointment] = React.useState();
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isNewAppointment, setIsNewAppointment] = React.useState(false);

  const [typeSchedule, setTypeSchedule] = React.useState(EnumTypeCalendar.Task);

  //function
  const onEditingAppointmentChange = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  // const onAddedAppointmentChange = (addedAppointment) => {
  //   setAddedAppointment(addedAppointment);
  //   if (editingAppointment !== undefined) {
  //     setPreviousAppointment(editingAppointment);
  //   }
  //   setEditingAppointment(undefined);
  //   setIsNewAppointment(true);
  // };

  const handleDeletedAppointmentId = (id) => {
    setDeletedAppointmentId(id);
  };

  const changeFormVisible = () => {
    setEditFormVisible(!editFormVisible);
  };

  const commitChanges = (value) => {
    console.log(new Date(value.startTime).getHours())
    if (value.type === EnumTypeAppointment.Add) {
      // setDateRender(prev => [...prev, {
      //   id: dataRender.length > 0 ? dataRender[dataRender.length - 1].id + 1 : 1,
      //   title: value.subject,
      //   startDate: new Date(value.startDate.getFullYear(), value.startDate.getMonth() + 1, value.startDate.getDate(), value.startTime.getHours(), value.startTime.getMinutes()),
      //   endDate: new Date(value.endDate.getFullYear(), value.endDate.getMonth() + 1, value.endDate.getDate(), value.endTime.getHours(), value.endTime.getMinutes()),
      //   notes: value.notes,
      //   room: value.room
      // }])
    }
  }

  // const commitChanges = ({ added, changed, deleted }) => {
  //   console.log({ added, changed, deleted });
  //   let _dataRender;
  //   if (added) {
  //     const startingAddedId =
  //       dataRender.length > 0 ? dataRender[dataRender.length - 1].id + 1 : 0;
  //     _dataRender = [...dataRender, { id: startingAddedId, ...added }];
  //   }
  //   if (changed) {
  //     _dataRender = dataRender.map((appointment) =>
  //       changed[appointment.id]
  //         ? { ...appointment, ...changed[appointment.id] }
  //         : appointment
  //     );
  //     console.log({ _dataRender });
  //   }
  //   if (deleted !== undefined) {
  //     handleDeletedAppointmentId(deleted);
  //     setConfirmVisible(!confirmVisible);
  //   }
  //   setDateRender(_dataRender);
  // };

  const appointmentFormSchedule = connectProps(ScheduleFormAppointment, () => {
    console.log({ dataRender })
    let currentAppointment = addedAppointment
    // const currentAppointment =
    //   dataRender.filter(
    //     (appointment) =>
    //       editingAppointment && appointment.id === editingAppointment.id
    //   )[0] || addedAppointment;
    const cancelAppointment = () => {
      if (isNewAppointment) {
        setEditingAppointment(previousAppointment);
        setIsNewAppointment(false);
      }
    };

    return {
      visible: editFormVisible,
      appointmentData: currentAppointment,
      commitChanges: commitChanges,
      visibleChange: changeFormVisible,
      onEditingAppointmentChange: onEditingAppointmentChange,
      cancelAppointment,
    };
  });
  return (
    <Paper>
      <Scheduler data={dataRender} height={660}>
        <ViewState currentDate={new Date()} />
        <EditingState
          onCommitChanges={(e) => {
            console.log("commit change ", e);
            commitChanges(e);
          }}
          onEditingAppointmentChange={(editingAppointment) => {
            console.log("editting ", editingAppointment)
            setEditFormVisible(true)
          }}
          onAddedAppointmentChange={(e) => {
            console.log("add ", e);
            setEditFormVisible(true)
          }}
          onAppointmentChangesChange={(e) => {
            console.log("change change ", e)
          }}
        />

        <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
        <MonthView />
        <AllDayPanel />
        <EditRecurrenceMenu />
        <Appointments />
        <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <TodayButton />
        <AppointmentForm
          overlayComponent={appointmentFormSchedule
          }
          visible={editFormVisible}
          onVisibilityChange={() => {
            setEditFormVisible(true)
          }}
        />
        <DragDropProvider allowDrag={() => true} />
        <Resources data={Resource} mainResourceName="subject" />
      </Scheduler>

      {/* <Dialog open={confirmVisible} onClose={cancelDelete}>
        <DialogTitle>Delete Appointment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleConfirmationVisible}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={commitDeletedAppointment}
            color="secondary"
            variant="outlined"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog> */}

      <StyledFab
        color="secondary"
        className={classes.addButton}
        onClick={() => {
          setEditFormVisible(true)
          // onEditingAppointmentChange(undefined);
          // onAddedAppointmentChange({
          //   startDate: new Date(currentDate).setHours(startDayHour),
          //   endDate: new Date(currentDate).setHours(startDayHour + 1),
          // });
        }}
      >
        <AddIcon />
      </StyledFab>
    </Paper>
  );
}
