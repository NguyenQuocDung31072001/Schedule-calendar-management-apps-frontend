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
import { StyledDiv, classes } from "../common";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { getDetailTime } from "../../../util/getDetailTime";
import { EnumColor, EnumTypeAppointment } from "../../../interface/enum";
import { CirclePicker } from "react-color";
import ScheduleRepeatModal from "../modal/ScheduleRepeatModal";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Resource } from "../../../fake_data/Resource";
import { useTranslation } from "react-i18next";

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
  const [selectTypeEndSchedule, setSelectTypeEndSchedule] =
    React.useState("endDate");
  const [t] = useTranslation("common");

  const isNewAppointment = appointmentData.id === undefined;
  const applyChanges = isNewAppointment
    ? () => commitAppointment(EnumTypeAppointment.Add)
    : () => commitAppointment(EnumTypeAppointment.Change);

  const { control, handleSubmit } = useForm({
    defaultValues: React.useMemo(() => {
      if (!isNewAppointment) {
        return {
          subject: appointmentData.title,
          startDate: appointmentData.startDate,
          startTime: appointmentData.startDate,
          endTime: appointmentData.endDate,
          endDate: appointmentData.endDate,
          numOfLessonsPerDay: "",
          notification: "",
          notes: appointmentData.notes,
          color: appointmentData.color,
        };
      } else {
        return {
          subject: "",
          startDate: appointmentData.startDate,
          startTime: appointmentData.startDate,
          endTime: appointmentData.endDate,
          endDate: appointmentData.endDate,
          notification: "",
          numOfLessonsPerDay: "",
          notes: "",
          color: [],
        };
      }
    }, [appointmentData]),
  });
  const colorWatch = useWatch({
    control: control,
    name: "color",
  });
  //useEffect | useCallback
  React.useEffect(() => {
    applyChanges();
    /* eslint-disable-next-line react/no-multi-comp */
  }, [dataForm]);

  //funtion
  const onSubmitForm = (data) => {
    if (selectTypeEndSchedule === "endDate") {
      data.numOfLessonsPerDay = "";
    } else {
      data.endDate = "";
    }
    setDataForm(data);
    visibleChange();
  };
  console.log({ dataForm });
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
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleSubmit(onSubmitForm)}
          >
            {isNewAppointment
              ? t(`form.schedule.create`)
              : t(`form.schedule.save`)}
          </Button>
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
