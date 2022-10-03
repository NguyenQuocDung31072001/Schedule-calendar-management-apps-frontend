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
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";

//material component
import {
  Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Modal, Backdrop, Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio,
} from "@mui/material";

//material icon
import AddIcon from "@mui/icons-material/Add";

// common component
import { StyledFab, classes } from "./common"

//component
import { TaskFormAppointment, ScheduleFormAppointment } from "./form/index"

//data fake
import { CurrentDate, TaskData } from "../../fake_data/index"

const ITypeSchedule = {
  Task: "task",
  Schedule: "schedule"
}

export default function Schedule() {
  //data || hook get data
  const [state, setState] = React.useState({
    data: TaskData,
    currentDate: CurrentDate,
    confirmationVisible: false,
    editingFormVisible: false,
    deletedAppointmentId: undefined,
    editingAppointment: undefined,
    previousAppointment: undefined,
    addedAppointment: {},
    startDayHour: 9,
    endDayHour: 19,
    isNewAppointment: false,
  })

  const [openModalTypeSchedule, setOpenModalTypeSchedule] = React.useState(false)
  const [typeSchedule, setTypeSchedule] = React.useState(ITypeSchedule.Task)
  //function
  const onEditingAppointmentChange = (editingAppointment) => {
    setState({ ...state, editingAppointment });
  }

  const onAddedAppointmentChange = (addedAppointment) => {
    setState({ ...state, addedAppointment });
    const { editingAppointment } = state;
    if (editingAppointment !== undefined) {
      setState({
        ...state,
        previousAppointment: editingAppointment,
      });
    }
    setState({ ...state, editingAppointment: undefined, isNewAppointment: true });
  }

  const setDeletedAppointmentId = (id) => {
    let _state = state
    _state.deletedAppointmentId = id
    setState(_state);
  }

  const toggleEditingFormVisibility = () => {
    setOpenModalTypeSchedule(true)
    // const { editingFormVisible } = state;
    // setState({
    //   ...state,
    //   editingFormVisible: !editingFormVisible,
    // });
  }
  const confirmChooseType = () => {
    setOpenModalTypeSchedule(false)
    let _state = state
    _state.editingFormVisible = !_state.editingFormVisible
    // const { editingFormVisible } = state;
    setState(_state);
  }
  React.useEffect(() => {
    console.log({ openModalTypeSchedule })
  }, [openModalTypeSchedule])
  const toggleConfirmationVisible = () => {
    let _state = {
      ...state,
      confirmationVisible: !state.confirmationVisible
    }
    setState(_state);
  }

  const commitDeletedAppointment = () => {
    const nextData = state.data.filter(
      (appointment) => appointment.id !== state.deletedAppointmentId
    );
    setState(prev => ({
      ...prev,
      data: nextData,
      deletedAppointmentId: null,
    }))
    toggleConfirmationVisible();
  }
  const commitChanges = ({ added, changed, deleted }) => {
    let { data } = state;
    if (added) {
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      data = [...data, { id: startingAddedId, ...added }];
    }
    if (changed) {
      data = data.map((appointment) =>
        changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
      );
    }
    if (deleted !== undefined) {
      setDeletedAppointmentId(deleted);
      toggleConfirmationVisible();
    }
    let _state = state
    state.data = data
    setState(_state)

  }
  const appointmentFormTask = connectProps(ScheduleFormAppointment, () => {
    //data | hook get data
    const {
      editingFormVisible,
      editingAppointment,
      data,
      addedAppointment,
      isNewAppointment,
      previousAppointment,
    } = state;
    const currentAppointment =
      data.filter(
        (appointment) =>
          editingAppointment && appointment.id === editingAppointment.id
      )[0] || addedAppointment;
    const cancelAppointment = () => {
      if (isNewAppointment) {
        setState({
          ...state,
          editingAppointment: previousAppointment,
          isNewAppointment: false,
        });
      }
    };

    return {
      visible: editingFormVisible,
      appointmentData: currentAppointment,
      commitChanges: commitChanges,
      visibleChange: toggleEditingFormVisibility,
      onEditingAppointmentChange: onEditingAppointmentChange,
      cancelAppointment,
    };
  })
  const appointmentFormSchedule = connectProps(ScheduleFormAppointment, () => {
    //data | hook get data
    const {
      editingFormVisible,
      editingAppointment,
      data,
      addedAppointment,
      isNewAppointment,
      previousAppointment,
    } = state;
    const currentAppointment =
      data.filter(
        (appointment) =>
          editingAppointment && appointment.id === editingAppointment.id
      )[0] || addedAppointment;
    const cancelAppointment = () => {
      if (isNewAppointment) {
        setState({
          ...state,
          editingAppointment: previousAppointment,
          isNewAppointment: false,
        });
      }
    };

    return {
      visible: editingFormVisible,
      appointmentData: currentAppointment,
      commitChanges: commitChanges,
      visibleChange: toggleEditingFormVisibility,
      onEditingAppointmentChange: onEditingAppointmentChange,
      cancelAppointment,
    };
  })
  // React.useEffect(() => {
  //   appointmentForm.update()
  // }, [appointmentForm])
  return (
    <Paper>
      <Scheduler data={state.data} height={660}>
        <ViewState currentDate={state.currentDate} />
        <EditingState
          onCommitChanges={commitChanges}
          onEditingAppointmentChange={onEditingAppointmentChange}
          onAddedAppointmentChange={onAddedAppointmentChange}
        />
        <WeekView startDayHour={state.startDayHour} endDayHour={state.endDayHour} />
        <MonthView />
        <AllDayPanel />
        <EditRecurrenceMenu />
        <Appointments />
        <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
        <Toolbar />
        <ViewSwitcher />
        <AppointmentForm
          overlayComponent={typeSchedule === ITypeSchedule.Task ? appointmentFormTask : appointmentFormSchedule}
          // visible={state.editingFormVisible}
          onVisibilityChange={toggleEditingFormVisibility}
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
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="spring-modal-title" variant="h6" component="h2">
            Choose type schedule
          </Typography>
          <Typography id="spring-modal-description" sx={{ mt: 2 }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={ITypeSchedule.Task}
                name="radio-buttons-group"
                value={typeSchedule}
                onChange={(event) => setTypeSchedule(event.target.value)}
              >
                <FormControlLabel value={ITypeSchedule.Task} control={<Radio />} label="Task" />
                <FormControlLabel value={ITypeSchedule.Schedule} control={<Radio />} label="Schedule" />
              </RadioGroup>
            </FormControl>
            <Button onClick={confirmChooseType}>ok</Button>
          </Typography>
        </Box>
      </Modal>
      <Dialog open={state.confirmationVisible} onClose={state.cancelDelete}>
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
      </Dialog>

      <StyledFab
        color="secondary"
        className={classes.addButton}
        onClick={() => {
          setState({ ...state, editingFormVisible: true });
          onEditingAppointmentChange(undefined);
          onAddedAppointmentChange({
            startDate: new Date(state.currentDate).setHours(state.startDayHour),
            endDate: new Date(state.currentDate).setHours(state.startDayHour + 1),
          });
        }}
      >
        <AddIcon />
      </StyledFab>
    </Paper>
  );
}
