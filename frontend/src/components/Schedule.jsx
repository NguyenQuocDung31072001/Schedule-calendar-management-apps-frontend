import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import LocationOn from "@mui/icons-material/LocationOn";
import Notes from "@mui/icons-material/Notes";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";

const appointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2018, 5, 25, 9, 35),
    endDate: new Date(2018, 5, 25, 11, 30),
    id: 0,
    location: "Room 1",
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2018, 5, 25, 12, 11),
    endDate: new Date(2018, 5, 25, 13, 0),
    id: 1,
    location: "Room 1",
  },
  {
    title: "Install New Router in Dev Room",
    startDate: new Date(2018, 5, 25, 14, 30),
    endDate: new Date(2018, 5, 25, 15, 35),
    id: 2,
    location: "Room 2",
  },
];

const PREFIX = "Demo";
// #FOLD_BLOCK
const classes = {
  content: `${PREFIX}-content`,
  header: `${PREFIX}-header`,
  closeButton: `${PREFIX}-closeButton`,
  buttonGroup: `${PREFIX}-buttonGroup`,
  button: `${PREFIX}-button`,
  picker: `${PREFIX}-picker`,
  wrapper: `${PREFIX}-wrapper`,
  icon: `${PREFIX}-icon`,
  textField: `${PREFIX}-textField`,
  addButton: `${PREFIX}-addButton`,
};

// #FOLD_BLOCK
const StyledDiv = styled("div")(({ theme }) => ({
  [`& .${classes.icon}`]: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  [`& .${classes.header}`]: {
    overflow: "hidden",
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.textField}`]: {
    width: "100%",
  },
  [`& .${classes.content}`]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  [`& .${classes.closeButton}`]: {
    float: "right",
  },
  [`& .${classes.picker}`]: {
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
    width: "50%",
  },
  [`& .${classes.wrapper}`]: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1, 0),
  },
  [`& .${classes.buttonGroup}`]: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
  },
  [`& .${classes.button}`]: {
    marginLeft: theme.spacing(2),
  },
}));
const StyledFab = styled(Fab)(({ theme }) => ({
  [`&.${classes.addButton}`]: {
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(4),
  },
}));

//function
function AppointmentFormContainerBasic({ visible, appointmentData, commitChanges, visibleChange, onEditingAppointmentChange, cancelAppointment, target, onHide }) {

  //state | data | hook get data
  const [state, setState] = React.useState({
    appointmentChanges: {},
  })

  let appointmentChanges = state.appointmentChanges
  const isNewAppointment = appointmentData.id === undefined;

  const displayAppointmentData = {
    ...appointmentData,
    ...appointmentChanges,
  };
  const applyChanges = isNewAppointment
    ? () => commitAppointment("added")
    : () => commitAppointment("changed");

  //funtion
  const changeAppointment = ({ field, changes }) => {
    const nextChanges = {
      appointmentChanges,
      [field]: changes,
    };
    setState({
      appointmentChanges: nextChanges,
    });
  }

  const commitAppointment = (type) => {
    const appointment = {
      appointmentData,
      appointmentChanges,
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment });
    }
    setState({
      appointmentChanges: {},
    });
  }

  const textEditorProps = (field) => ({
    variant: "outlined",
    onChange: ({ target: change }) =>
      changeAppointment({
        field: [field],
        changes: change.value,
      }),
    value: displayAppointmentData[field] || "",
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  const pickerEditorProps = (field) => ({
    // keyboard: true,
    value: displayAppointmentData[field],
    onChange: (date) =>
      changeAppointment({
        field: [field],
        changes: date
          ? date.toDate()
          : new Date(displayAppointmentData[field]),
      }),
    ampm: false,
    inputFormat: "DD/MM/YYYY HH:mm",
    onError: () => null,
  });
  const startDatePickerProps = pickerEditorProps("startDate");
  const endDatePickerProps = pickerEditorProps("endDate");

  const cancelChanges = () => {
    setState({
      appointmentChanges: {},
    });
    visibleChange();
    cancelAppointment();
  };

  return (
    <AppointmentForm.Overlay
      visible={visible}
      target={target}
      fullSize={false}
      onHide={onHide}
    >
      <StyledDiv>
        <div className={classes.header}>
          <IconButton
            className={classes.closeButton}
            onClick={cancelChanges}
            size="large"
          >
            <Close color="action" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <Create className={classes.icon} color="action" />
            <TextField {...textEditorProps("title")} />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                label="Start Date"
                renderInput={(props) => (
                  <TextField className={classes.picker} {...props} />
                )}
                {...startDatePickerProps}
              />
              <DateTimePicker
                label="End Date"
                renderInput={(props) => (
                  <TextField className={classes.picker} {...props} />
                )}
                {...endDatePickerProps}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.wrapper}>
            <LocationOn className={classes.icon} color="action" />
            <TextField {...textEditorProps("location")} />
          </div>
          <div className={classes.wrapper}>
            <Notes className={classes.icon} color="action" />
            <TextField {...textEditorProps("notes")} multiline rows="6" />
          </div>
        </div>
        <div className={classes.buttonGroup}>
          {!isNewAppointment && (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                commitAppointment("deleted");
              }}
            >
              Delete
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => {
              visibleChange();
              applyChanges();
            }}
          >
            {isNewAppointment ? "Create" : "Save"}
          </Button>
        </div>
      </StyledDiv>
    </AppointmentForm.Overlay>
  );
}

/* eslint-disable-next-line react/no-multi-comp */
export default function Schedule() {
  //data || hook get data
  const [state, setState] = React.useState({
    data: appointments,
    currentDate: "2018-06-27",
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


  //appointmentForm.update()
  //function
  const onEditingAppointmentChange = (editingAppointment) => {
    setState({ editingAppointment });
  }

  const onAddedAppointmentChange = (addedAppointment) => {
    setState({ addedAppointment });
    const { editingAppointment } = state;
    if (editingAppointment !== undefined) {
      setState({
        previousAppointment: editingAppointment,
      });
    }
    setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  const setDeletedAppointmentId = (id) => {
    setState({ deletedAppointmentId: id });
  }

  const toggleEditingFormVisibility = () => {
    const { editingFormVisible } = state;
    setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  const toggleConfirmationVisible = () => {
    const { confirmationVisible } = state;
    setState({ confirmationVisible: !confirmationVisible });
  }

  const commitDeletedAppointment = () => {
    setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(
        (appointment) => appointment.id !== deletedAppointmentId
      );

      return { data: nextData, deletedAppointmentId: null };
    });
    toggleConfirmationVisible();
  }
  const commitChanges = ({ added, changed, deleted }) => {
    console.log({ added, changed, deleted });
    setState((state) => {
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
      return { data, addedAppointment: {} };
    });
  }
  const appointmentForm = connectProps(AppointmentFormContainerBasic, () => {
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
          overlayComponent={appointmentForm}
          visible={state.editingFormVisible}
          onVisibilityChange={toggleEditingFormVisibility}
        />
        <DragDropProvider />
      </Scheduler>

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
          setState({ editingFormVisible: true });
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
