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
import { Paper } from "@mui/material";

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

  //function
  const onEditingAppointmentChange = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  const changeFormVisible = () => {
    setEditFormVisible(!editFormVisible);
  };
  const commitChanges = (value) => {
    if (value.type === EnumTypeAppointment.Add) {
      setDateRender((prev) => [
        ...prev,
        {
          id:
            dataRender.length > 0
              ? dataRender[dataRender.length - 1].id + 1
              : 1,
          title: value.subject,
          startDate: value.startDate,
          endDate: value.endDate,
          notes: value.notes,
          room: value.room,
          isRepeat: value.isRepeat,
        },
      ]);
    } else if (value.type === EnumTypeAppointment.Change) {
      dataRender.forEach((data) => {
        if (data.id === value.id) {
          data.title = value.subject;
          data.startDate = value.startDate;
          data.endDate = value.endDate;
          data.notes = value.notes;
          data.room = value.room;
          data.isRepeat = value.isRepeat;
        }
      });
      setDateRender(dataRender);
    } else {
      setDateRender(dataRender.filter((data) => data.id !== value.deleted));
    }
  };

  const appointmentFormSchedule = connectProps(ScheduleFormAppointment, () => {
    let currentAppointment =
      dataRender.filter(
        (appointment) =>
          editingAppointment && appointment.id === editingAppointment.id
      )[0] || addedAppointment;
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
            console.log("editting ", editingAppointment);
            setEditingAppointment(editingAppointment);
            // setEditFormVisible(true);
          }}
          onAddedAppointmentChange={(newAppoiment) => {
            changeFormVisible();
            console.log("add ", newAppoiment);
            setAddedAppointment(newAppoiment);
            setEditingAppointment();
            // setIsNewAppointment(false);
          }}
          onAppointmentChangesChange={(e) => {
            console.log("change change ", e);
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
          overlayComponent={appointmentFormSchedule}
          visible={editFormVisible}
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
          setEditFormVisible(true);
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
