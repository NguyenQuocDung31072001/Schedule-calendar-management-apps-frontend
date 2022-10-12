import React from "react";

//dx-react-scheduler-material-ui

//material component
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { EnumColor, EnumTypeAppointment } from "../../../interface/enum";
import { CirclePicker, SketchPicker } from "react-color";
import ScheduleRepeatModal from "../modal/ScheduleRepeatModal";
import { Controller, useForm } from "react-hook-form";
import { Resource } from "../../../fake_data/Resource";

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
  const [dataForm, setDataForm] = React.useState();
  const [confirmVisible, setConfirmVisible] = React.useState(false);

  const isNewAppointment = appointmentData.id === undefined;
  const applyChanges = isNewAppointment
    ? () => commitAppointment(EnumTypeAppointment.Add)
    : () => commitAppointment(EnumTypeAppointment.Change);

  const { register, control, handleSubmit } = useForm({
    defaultValues: React.useMemo(() => {
      if (!isNewAppointment) {
        return {
          subject: appointmentData.title,
          startDate: appointmentData.startDate,
          endDate: appointmentData.endDate,
          startTime: appointmentData.startDate,
          endTime: appointmentData.endDate,
          notes: appointmentData.notes,
          color: appointmentData.color,
        };
      } else {
        return {
          subject: "",
          startDate: appointmentData.startDate,
          endDate: appointmentData.endDate,
          startTime: appointmentData.startDate,
          endTime: appointmentData.endDate,
          notes: "",
          color: [],
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
    setDataForm(data);
    visibleChange();
  };
  const commitAppointment = (type) => {
    if (dataForm) {
      const parseStartDate = getDetailTime(dataForm.startDate);
      const parseEndDate = getDetailTime(dataForm.endDate);
      const parseStartTime = getDetailTime(dataForm.startTime);
      const parseEndTime = getDetailTime(dataForm.endTime);
      const indexColor = Resource[0].instances.findIndex(
        (item) => item.color === dataForm?.color?.hex
      );
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
        color: indexColor >= 0 ? [indexColor + 1] : appointmentData.color,
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
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <CirclePicker
                    {...field}
                    circleSize={20}
                    colors={[
                      EnumColor.red,
                      EnumColor.orange,
                      EnumColor.violet,
                      EnumColor.gray,
                    ]}
                    // color={color}
                    // onChange={(color) => setColor(color)}
                  />
                )}
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
                setConfirmVisible(true);
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

        <Dialog open={confirmVisible} onClose={() => setConfirmVisible(false)}>
          <DialogTitle>Delete Appointment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this appointment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmVisible(false)}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setConfirmVisible(false);
                visibleChange();
              }}
              color="secondary"
              variant="outlined"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </StyledDiv>
  );
}
/* eslint-disable-next-line react/no-multi-comp */
