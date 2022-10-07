import React, { useEffect } from "react";

//dx-react-scheduler-material-ui
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

//material component
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

//material icon
import Notes from "@mui/icons-material/Notes";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";
import AlarmIcon from "@mui/icons-material/Alarm";

// material date picker
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// common component
import { StyledDiv, classes } from "../common";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { getDetailTime } from "../../../util/getDetailTime";
import { EnumTypeAppointment } from "../../../interface/enum";

export default function ScheduleFormAppointment({
  visible,
  appointmentData,
  commitChanges,
  visibleChange,
  onEditingAppointmentChange,
  cancelAppointment,
  target,
  onHide,
}) {
  //state | data | hook get data
  // const [value, setValue] = React.useState(dayjs('2018-01-01T00:00:00.000Z'));
  const [subject, setSubject] = React.useState("");
  const [isRepeat, setIsRepeat] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());
  const [room, setRoom] = React.useState("");
  const [notes, setNotes] = React.useState("");
  // console.log({ appointmentData });
  const isNewAppointment = appointmentData.id === undefined;
  const applyChanges = isNewAppointment
    ? () => commitAppointment(EnumTypeAppointment.Add)
    : () => commitAppointment(EnumTypeAppointment.Change);

  React.useEffect(() => {
    if (!isNewAppointment) {
      setSubject(appointmentData.title);
      setStartDate(appointmentData.startDate);
      setStartTime(appointmentData.startDate);
      setEndDate(appointmentData.endDate);
      setEndTime(appointmentData.endDate);
      setIsRepeat(appointmentData.isRepeat);
      setRoom(appointmentData.room);
      setNotes(appointmentData.notes);
    } else {
      setStartDate(appointmentData.startDate);
      setEndDate(appointmentData.endDate);
    }
  }, []);
  //funtion

  const commitAppointment = (type) => {
    const parseStartDate = getDetailTime(startDate);
    const parseEndDate = getDetailTime(endDate);
    const parseStartTime = getDetailTime(startTime);
    const parseEndTime = getDetailTime(endTime);
    commitChanges({
      id: appointmentData?.id,
      type: type,
      subject: subject,
      startDate: new Date(
        parseStartDate.year,
        parseStartDate.month,
        parseStartDate.day,
        parseStartTime.hours,
        parseStartTime.minutes
      ),
      endDate: new Date(
        parseEndDate.year,
        parseEndDate.month,
        parseEndDate.day,
        parseEndTime.hours,
        parseEndTime.minutes
      ),
      room: room,
      notes: notes,
      isRepeat: isRepeat,
    });
  };
  const cancelChanges = () => {
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
            <TextField
              variant="outlined"
              label="Subject"
              className={classes.textField}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Start Date"
                views={["year", "month", "day"]}
                renderInput={(params) => <TextField {...params} />}
                value={startDate}
                onChange={(e) => {
                  console.log(e);
                  setStartDate(e);
                }}
              />
              <DatePicker
                label="End Date"
                views={["year", "month", "day"]}
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.wrapper}>
            <AlarmIcon className={classes.icon} color="action" />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <TimePicker
                label="Time start"
                value={startTime}
                onChange={setStartTime}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Time End"
                value={endTime}
                onChange={setEndTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <span>Repeat</span>
            <Checkbox
              checked={isRepeat}
              onChange={(event) => setIsRepeat(event.target.checked)}
            />
          </div>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "100px" }}>
              <FormControl fullWidth>
                <InputLabel id="id-select-room">Room</InputLabel>
                <Select
                  labelId="id-select-room"
                  id="id-select-room"
                  value={room}
                  label="Room"
                  onChange={(event) => setRoom(event.target.value)}
                >
                  <MenuItem value="room 1">room 1</MenuItem>
                  <MenuItem value="room 2">room 2</MenuItem>
                  <MenuItem value="room 3">room 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <div className={classes.wrapper}>
            <Notes className={classes.icon} color="action" />
            <TextField
              variant="outlined"
              label="Notes"
              className={classes.textField}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              multiline
              rows="6"
            />
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
