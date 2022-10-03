import React from 'react'
import dayjs from "dayjs"

//dx-react-scheduler-material-ui
import {
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

//material component
import {
  Box,
  Button,
  IconButton,
  TextField
} from "@mui/material";

//material icon
import Notes from "@mui/icons-material/Notes";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";
import AlarmIcon from '@mui/icons-material/Alarm';

// material date picker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// common component
import { StyledDiv, classes } from "../common"
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

export default function ScheduleFormAppointment({ visible, appointmentData, commitChanges, visibleChange, onEditingAppointmentChange, cancelAppointment, target, onHide }) {
  //state | data | hook get data
  const [state, setState] = React.useState({
    appointmentChanges: {},
  })
  const [value, setValue] = React.useState(dayjs('2018-01-01T00:00:00.000Z'));

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
    let _state = state
    _state.appointmentChanges = {}
    setState(_state);
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
    ampm: true,
    inputFormat: "DD/MM/YYYY",
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
            <TextField {...textEditorProps("Subject")} />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Start Date"
                views={['year', 'month', 'day']}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                {...startDatePickerProps}
              />
              <DatePicker
                label="End Date"
                views={['year', 'month', 'day']}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                {...endDatePickerProps}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.wrapper}>
            <AlarmIcon className={classes.icon} color="action" />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                label="Time start"
                value={value}
                onChange={setValue}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Time End"
                value={value}
                onChange={setValue}
                renderInput={(params) => <TextField {...params} />}
              />

            </LocalizationProvider>
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
