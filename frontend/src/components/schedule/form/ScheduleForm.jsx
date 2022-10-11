import React from "react";

//dx-react-scheduler-material-ui

//material component
import {
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

//material icon
import Notes from "@mui/icons-material/Notes";
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
import { CirclePicker, SketchPicker } from "react-color";
import ScheduleRepeatModal from "../modal/ScheduleRepeatModal";
import { Controller, useForm } from "react-hook-form";

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
  const [color, setColor] = React.useState("");
  const [dataForm, setDataForm] = React.useState();
  const isNewAppointment = appointmentData.id === undefined;
  const applyChanges = isNewAppointment
    ? () => commitAppointment(EnumTypeAppointment.Add)
    : () => commitAppointment(EnumTypeAppointment.Change);

  console.log({ appointmentData })
  const { register, control, handleSubmit } = useForm({
    defaultValues: React.useMemo(() => {
      if (!isNewAppointment) {
        console.log("ok")
        return {
          subject: appointmentData.title,
          startDate: appointmentData.startDate,
          endDate: appointmentData.endDate,
          startTime: appointmentData.startDate,
          endTime: appointmentData.endDate,
          notes: appointmentData.notes,
        };
      } else {
        return {
          subject: "",
          startDate: appointmentData.startDate,
          endDate: appointmentData.endDate,
          startTime: appointmentData.startDate,
          endTime: appointmentData.endDate,
          notes: "",
        };
      }
    }, [appointmentData]),
  });
  //useEffect | useCallback
  React.useEffect(() => {
    applyChanges();
  }, [dataForm]);

  //funtion
  const onSubmitForm = (data) => {
    // console.log(data);
    setDataForm(data);
    visibleChange();
  };
  const commitAppointment = (type) => {
    if (dataForm) {
      const parseStartDate = getDetailTime(dataForm.startDate);
      const parseEndDate = getDetailTime(dataForm.endDate);
      const parseStartTime = getDetailTime(dataForm.startTime);
      const parseEndTime = getDetailTime(dataForm.endTime);
      commitChanges({
        id: appointmentData?.id,
        type: type,
        subject: dataForm.subject,
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
        notes: dataForm.notes,
      });
    }
  };

  return (
    <StyledDiv>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Create className={classes.icon} color="action" />
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="Subject"
                className={classes.textField}
                {...field}
              />
            )}
          />
        </div>
        <div className={classes.wrapper}>
          <CalendarToday className={classes.icon} color="action" />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Start Date"
                  views={["year", "month", "day"]}
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="End Date"
                  views={["year", "month", "day"]}
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
        </div>
        <div className={classes.wrapper}>
          <AlarmIcon className={classes.icon} color="action" />
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="Time start"
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="Time End"
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
        </div>
        <Box sx={{ display: "flex", alignItem: "center" }}>
          <AlarmIcon className={classes.icon} color="action" />
          <ScheduleRepeatModal />
        </Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <AlarmIcon className={classes.icon} color="action" />
          <div
            className={classes.wrapper}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "20px", height: "30px" }}>
              Choose color
            </Typography>
            <Box>
              <CirclePicker
                circleSize={20}
                colors={[
                  "#f44336",
                  "#e91e63",
                  "#9c27b0",
                  "#673ab7",
                  "#3f51b5",
                  "#2196f3",
                  "#03a9f4",
                  "#00bcd4",
                  "#009688",
                  "#4caf50",
                  "#8bc34a",
                  "#cddc39",
                  "#ffeb3b",
                  "#ffc107",
                  "#ff9800",
                  "#ff5722",
                  "#795548",
                  "#607d8b",
                ]}
                color={color}
                onChange={(color) => setColor(color)}
              />
            </Box>
          </div>
        </Box>
        <div className={classes.wrapper}>
          <Notes className={classes.icon} color="action" />
          <TextField
            variant="outlined"
            label="Notes"
            className={classes.textField}
            {...register("notes")}
            multiline
            rows="6"
          />
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
            onClick={handleSubmit(onSubmitForm)}
          >
            {isNewAppointment ? "Create" : "Save"}
          </Button>
        </div>
      </div>
    </StyledDiv>
  );
}
/* eslint-disable-next-line react/no-multi-comp */
