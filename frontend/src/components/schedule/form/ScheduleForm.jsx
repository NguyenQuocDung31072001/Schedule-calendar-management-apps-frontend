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
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";

//material icon
import Notes from "@mui/icons-material/Notes";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";
import AlarmIcon from '@mui/icons-material/Alarm';

// material date picker
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// common component
import { StyledDiv, classes } from "../common"
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

export default function ScheduleFormAppointment({ visible, appointmentData, commitChanges, visibleChange, onEditingAppointmentChange, cancelAppointment, target, onHide }) {
  //state | data | hook get data
  // const [value, setValue] = React.useState(dayjs('2018-01-01T00:00:00.000Z'));
  const [subject, setSubject] = React.useState("")
  const [isRepeat, setIsRepeat] = React.useState(false)
  const [startDate, setStartDate] = React.useState(new Date())
  const [endDate, setEndDate] = React.useState(new Date())
  const [startTime, setStartTime] = React.useState(new Date())
  const [endTime, setEndTime] = React.useState(new Date())
  const [room, setRoom] = React.useState("")
  const [notes, setNotes] = React.useState("")

  const isNewAppointment = appointmentData.id === undefined;

  const applyChanges = isNewAppointment
    ? () => commitAppointment("added")
    : () => commitAppointment("changed");

  //funtion


  const commitAppointment = (type) => {
    console.log("okokokoko", type)
    console.log("type submit ::: ", type)
    console.log("isRepeat ::: ", isRepeat)
    console.log("startDate ::: ", startDate)
    console.log("endDate ::: ", endDate)
    console.log("startTime ::: ", dayjs(startTime).$d)
    console.log("endTime ::: ", dayjs(endTime).$d)
    console.log("room ::: ", room)
    console.log("notes ::: ", notes)
    commitChanges({
      type: type,
      subject: subject,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      room: room,
      notes: notes
    })
  }


  // const pickerEditorProps = (field) => ({
  //   // keyboard: true,
  //   value: displayAppointmentData[field],
  //   onChange: (date) =>
  //     changeAppointment({
  //       field: [field],
  //       changes: date
  //         ? date.toDate()
  //         : new Date(displayAppointmentData[field]),
  //     }),
  //   ampm: true,
  //   inputFormat: "DD/MM/YYYY",
  //   onError: () => null,
  // });
  // const startDatePickerProps = pickerEditorProps("startDate");
  // const endDatePickerProps = pickerEditorProps("endDate");

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
            <TextField variant='outlined' label="Subject" className={classes.textField} value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Start Date"
                views={['year', 'month', 'day']}
                renderInput={(params) => <TextField {...params} />}
                value={startDate}
                onChange={(e) => {
                  console.log(e)
                  setStartDate(e)
                }}
              />
              <DatePicker
                label="End Date"
                views={['year', 'month', 'day']}
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
            <Checkbox onChange={event => setIsRepeat(event.target.checked)} />
          </div>
          <Box sx={{ display: "flex" }}>
            {/* 
            <Box sx={{ width: "100px" }}>
              <FormControl fullWidth>
                <InputLabel id="id-select-subject">Subject</InputLabel>
                <Select
                  labelId="id-select-subject"
                  id="id-select-subject"
                  value={subject}
                  label="Subject"
                  onChange={(event) => setSubject(event.target.value)}
                >
                  <MenuItem value="toan">toan</MenuItem>
                  <MenuItem value="van">van</MenuItem>
                  <MenuItem value="anh">anh</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
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
            <TextField variant='outlined' label="Notes" className={classes.textField} value={notes} onChange={(e) => setNotes(e.target.value)} multiline rows="6" />
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
