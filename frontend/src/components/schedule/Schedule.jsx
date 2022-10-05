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
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";

//material component
import {
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Modal,
  Backdrop,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

//material icon
import AddIcon from "@mui/icons-material/Add";

// common component
import { StyledFab, classes } from "./common";

//component
import { TaskFormAppointment, ScheduleFormAppointment } from "./form/index";

//data fake
import { CurrentDate, TaskData } from "../../fake_data/index";

import { EnumTypeCalendar } from "../../interface/enum";

const currentDate = CurrentDate;
const startDayHour = 9;
const endDayHour = 19;

export default function Schedule() {
  //data || hook get data
  const [dataRender, setDateRender] = React.useState(TaskData);
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [deletedAppointmentId, setDeletedAppointmentId] = React.useState();
  const [editingAppointment, setEditingAppointment] = React.useState();
  const [previousAppointment, setPreviousAppointment] = React.useState();
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isNewAppointment, setIsNewAppointment] = React.useState(false);
  const [openModalTypeSchedule, setOpenModalTypeSchedule] =
    React.useState(false);
  const [typeSchedule, setTypeSchedule] = React.useState(EnumTypeCalendar.Task);

  //function
  const onEditingAppointmentChange = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  const onAddedAppointmentChange = (addedAppointment) => {
    setAddedAppointment(addedAppointment);
    if (editingAppointment !== undefined) {
      setPreviousAppointment(editingAppointment);
    }
    setEditingAppointment(undefined);
    setIsNewAppointment(true);
  };

  const handleDeletedAppointmentId = (id) => {
    setDeletedAppointmentId(id);
  };

  const changeFormVisible = () => {
    setEditFormVisible(!editFormVisible);
  };

  const confirmChooseType = () => {
    setOpenModalTypeSchedule(false);
    setEditFormVisible(!editFormVisible);
  };
  React.useEffect(() => {}, [openModalTypeSchedule]);

  const toggleConfirmationVisible = () => {
    setConfirmVisible(!confirmVisible);
  };

  const commitDeletedAppointment = () => {
    const nextData = dataRender.filter(
      (appointment) => appointment.id !== deletedAppointmentId
    );
    setDateRender(nextData);
    setDeletedAppointmentId(null);
    toggleConfirmationVisible();
  };

  const commitChanges = ({ added, changed, deleted }) => {
    console.log({ added, changed, deleted });
    let _dataRender;
    if (added) {
      const startingAddedId =
        dataRender.length > 0 ? dataRender[dataRender.length - 1].id + 1 : 0;
      _dataRender = [...dataRender, { id: startingAddedId, ...added }];
    }
    if (changed) {
      _dataRender = dataRender.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
      console.log({ _dataRender });
    }
    if (deleted !== undefined) {
      handleDeletedAppointmentId(deleted);
      toggleConfirmationVisible();
    }
    setDateRender(_dataRender);
  };

  const appointmentFormTask = connectProps(TaskFormAppointment, () => {
    const currentAppointment =
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
  const appointmentFormSchedule = connectProps(ScheduleFormAppointment, () => {
    const currentAppointment =
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
  console.log({ openModalTypeSchedule });
  return (
    <Paper>
      <Scheduler data={dataRender} height={660}>
        <ViewState currentDate={currentDate} />
        <EditingState
          onCommitChanges={commitChanges}
          onEditingAppointmentChange={onEditingAppointmentChange}
          onAddedAppointmentChange={onAddedAppointmentChange}
        />
        <DayView
          displayName={"Day"}
          startDayHour={9}
          endDayHour={17}
          intervalCount={1}
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
          overlayComponent={
            typeSchedule === EnumTypeCalendar.Task
              ? appointmentFormTask
              : appointmentFormSchedule
          }
          visible={editFormVisible}
          onVisibilityChange={() => {
            setOpenModalTypeSchedule(true);
            // if (openModalTypeSchedule) {
            //   console.log("ok");
            //   setOpenModalTypeSchedule(false);
            // } else {
            // }
          }}
        />
        <DragDropProvider />
      </Scheduler>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openModalTypeSchedule}
        onClose={() => setOpenModalTypeSchedule(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="spring-modal-title" variant="h6" component="h2">
            Choose type schedule
          </Typography>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={EnumTypeCalendar.Task}
                name="radio-buttons-group"
                value={typeSchedule}
                onChange={(event) => setTypeSchedule(event.target.value)}
              >
                <FormControlLabel
                  value={EnumTypeCalendar.Task}
                  control={<Radio />}
                  label="Task"
                />
                <FormControlLabel
                  value={EnumTypeCalendar.Schedule}
                  control={<Radio />}
                  label="Schedule"
                />
              </RadioGroup>
            </FormControl>
          </Typography>
          <Button onClick={confirmChooseType}>ok</Button>
        </Box>
      </Modal>
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
          setOpenModalTypeSchedule(true);
          // setEditFormVisible(true)
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
