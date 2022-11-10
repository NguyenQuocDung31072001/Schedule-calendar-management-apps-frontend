import React from "react";

//dx-react-scheduler-material-ui

//material component
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
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
import { StyledDiv, classes } from "../../../components/schedule/common";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { getDetailTime } from "../../../util/getDetailTime";
import { EnumColor } from "../../../interface/enum";
import { CirclePicker } from "react-color";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { addNewScheduleMutation } from "../../../service/schedule_api";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

export default function ScheduleFormAppointment({
  addNewCourses,
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
  const [t] = useTranslation("common");
  const currentUser = useSelector((state) => state.account);
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [selectTypeEndSchedule, setSelectTypeEndSchedule] =
    React.useState("endDate");
  const isNewAppointment = appointmentData.id === undefined;
  //true=add false=change

  const { control, handleSubmit } = useForm({
    defaultValues: React.useMemo(() => {
      if (!isNewAppointment) {
        return {
          subject: appointmentData.title,
          code: "",
          startDate: appointmentData.startDate,
          startTime: appointmentData.startDate,
          endTime: appointmentData.endDate,
          endDate: appointmentData.endDate,
          numOfLessonsPerDay: "",
          numOfLessons: "",
          notification: "",
          notes: appointmentData.notes,
          color: appointmentData.color,
        };
      } else {
        return {
          subject: "",
          code: "",
          startDate: appointmentData.startDate,
          startTime: appointmentData.startDate,
          endTime: appointmentData.endDate,
          endDate: appointmentData.endDate,
          notification: "",
          numOfLessonsPerDay: "",
          numOfLessons: "",
          notes: "",
          color: [],
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appointmentData]),
  });
  const colorWatch = useWatch({
    control: control,
    name: "color",
  });

  // const { mutateAsync: addNewSchedule } = useMutation(addNewScheduleMutation, {
  //   onSuccess: () => {
  //     console.log("add schedule success")
  //   },
  //   onError: () => {
  //     console.log("add schedule error")
  //   }
  // })
  //funtion
  const onSubmitForm = (data) => {
    addNewCourses({
      title: data.subject,
      code: "string",
      description: data.notes,
      startTime:
        getDetailTime(data.startTime).hours * 3600 +
        getDetailTime(data.startTime).minutes * 60,
      endTime:
        getDetailTime(data.endTime).hours * 3600 +
        getDetailTime(data.endTime).minutes * 60,
      numOfLessonsPerDay: 0,
      startDate: data.startDate,
      endDate: data.endDate,
      numOfLessons: 0,
      notiBeforeTime: data.notification,
      colorCode: "string",
      token: currentUser.token,
    });
    visibleChange();
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
                label={t(`form.schedule.title`)}
                className={classes.textField}
                {...field}
              />
            )}
          />
        </div>
        <Box sx={{ display: "flex", alignItem: "center" }}>
          <CalendarToday className={classes.icon} color="action" />
          <div className={classes.wrapper}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label={t(`form.schedule.startDate`)}
                    views={["year", "month", "day"]}
                    renderInput={(params) => <TextField {...params} />}
                    {...field}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
        </Box>
        <div className={classes.wrapper}>
          <AlarmIcon className={classes.icon} color="action" />
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label={t(`form.schedule.timeStart`)}
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
                  label={t(`form.schedule.timeEnd`)}
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
        </div>
        {/* <Box sx={{ display: "flex", alignItem: "center" }}>
          <AlarmIcon className={classes.icon} color="action" />
          <ScheduleRepeatModal />
        </Box> */}
        <Box sx={{ display: "flex", alignItem: "center" }}>
          <AlarmIcon className={classes.icon} color="action" />
          <div className={classes.wrapper}>
            <FormControl>
              {/* <FormLabel id="choose-end-schedule">
                Choose end schedule
              </FormLabel> */}
              <RadioGroup
                row
                aria-labelledby="choose-end-schedule"
                name="row-radio-buttons-group"
                onChange={(e) => setSelectTypeEndSchedule(e.target.value)}
                defaultValue="endDate"
              >
                <FormControlLabel
                  value="endDate"
                  control={<Radio />}
                  label={
                    <>
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                          <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                              disabled={selectTypeEndSchedule !== "endDate"}
                              label={t(`form.schedule.endDate`)}
                              views={["year", "month", "day"]}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                              {...field}
                            />
                          </LocalizationProvider>
                        )}
                      />
                    </>
                  }
                />
                <FormControlLabel
                  value="numOfLessonsPerDay"
                  control={<Radio />}
                  label={
                    <>
                      <Controller
                        name="numOfLessonsPerDay"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            disabled={
                              selectTypeEndSchedule !== "numOfLessonsPerDay"
                            }
                            label="numLessons"
                            size="small"
                            type="number"
                            inputProps={{
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                              min: 0,
                              max: 10,
                            }}
                          />
                        )}
                      />
                    </>
                  }
                />
              </RadioGroup>
            </FormControl>
          </div>
        </Box>
        <Box sx={{ display: "flex", alignItem: "center" }}>
          <AlarmIcon className={classes.icon} color="action" />
          <div className={classes.wrapper}>
            <Controller
              name="notification"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                  <InputLabel id="notification-select">Notification</InputLabel>
                  <Select
                    {...field}
                    labelId="notification-select"
                    // value={5}
                    autoWidth
                    label="Notification"
                  >
                    <MenuItem value={5}>5 minutes</MenuItem>
                    <MenuItem value={10}>10 minutes</MenuItem>
                    <MenuItem value={15}>15 minutes</MenuItem>
                    <MenuItem value={20}>20 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </div>
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
              {t(`form.schedule.chooseColor`)}
            </Typography>
            <Box>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <CirclePicker
                    {...field}
                    circleSize={20}
                    color={colorWatch.hex}
                    colors={[
                      EnumColor.red,
                      EnumColor.orange,
                      EnumColor.violet,
                      EnumColor.gray,
                    ]}
                  />
                )}
              />
            </Box>
          </div>
        </Box>
        <div className={classes.wrapper}>
          <Notes className={classes.icon} color="action" />
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                label={t(`form.schedule.notes`)}
                className={classes.textField}
                multiline
                rows="6"
              />
            )}
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
              {t(`form.schedule.delete`)}
            </Button>
          )}
          <LoadingButton
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleSubmit(onSubmitForm)}
          >
            {isNewAppointment
              ? t(`form.schedule.create`)
              : t(`form.schedule.save`)}
          </LoadingButton>
        </div>

        <Dialog open={confirmVisible} onClose={() => setConfirmVisible(false)}>
          <DialogTitle>{t(`form.dialog.title`)}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t(`form.dialog.message`)}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmVisible(false)}
              color="primary"
              variant="outlined"
            >
              {t(`form.dialog.cancel`)}
            </Button>
            <Button
              onClick={() => {
                setConfirmVisible(false);
                visibleChange();
              }}
              color="secondary"
              variant="outlined"
            >
              {t(`form.dialog.delete`)}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </StyledDiv>
  );
}
/* eslint-disable-next-line react/no-multi-comp */
