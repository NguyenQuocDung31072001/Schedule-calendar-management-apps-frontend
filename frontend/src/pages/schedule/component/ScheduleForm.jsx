import React from "react";

//dx-react-scheduler-material-ui

//material component
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// common component
import { StyledDiv, classes } from "../../../components/schedule/common";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import {
  EnumColor,
  EnumNotiUnit,
  TypeWeekdaysOption,
} from "../../../interface/enum";
import { CirclePicker } from "react-color";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { getTime } from "../../../util/time/getTime";

export default function ScheduleFormAppointment({
  refetchGetAllEvent,
  addNewCourses,
  visibleChange,
  appointmentData,
}) {
  //state | data | hook get data
  const [t] = useTranslation("common");
  const currentUser = useSelector((state) => state.account);
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const isNewAppointment = appointmentData.id === undefined;
  const { control, handleSubmit } = useForm({
    defaultValues: React.useMemo(() => {
      if (!isNewAppointment) {
        return {
          title: appointmentData.title,
          code: appointmentData.code,
          startDate: appointmentData.startDate,
          startTime: appointmentData.startDate,
          endTime: appointmentData.endDate,
          endType: appointmentData.endType,
          endDate: appointmentData.endDate,
          numOfLessonsPerDay: appointmentData.numOfLessonsPerDay,
          numOfLessons: appointmentData.numOfLessons | 0,
          dayOfWeeks: appointmentData.dayOfWeeks
            ? appointmentData.dayOfWeeks
            : [],
          notification: appointmentData.notiBeforeTime,
          notiUnit: EnumNotiUnit.MINUTE,
          description: appointmentData.description,
          color: appointmentData.color,
        };
      }
      return {
        title: "",
        code: "",
        startDate: appointmentData.startDate,
        startTime: appointmentData.startDate,
        endTime: appointmentData.endDate,
        endType: "EndDate",
        endDate: appointmentData.endDate,
        numOfLessonsPerDay: "",
        numOfLessons: "",
        dayOfWeeks: [],
        notification: "",
        notiUnit: EnumNotiUnit.MINUTE,
        description: "",
        color: [],
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appointmentData]),
  });
  const colorWatch = useWatch({
    control: control,
    name: "color",
  });

  const endTypeWatch = useWatch({
    control: control,
    name: "endType",
  });
  //function
  const onSubmitForm = async (data) => {
    const {
      getHourParseToNumber: getHourParseToNumberStartTime,
      getMinusParseToNumber: getMinusParseToNumberStartime,
    } = getTime(data.startTime);
    const {
      getHourParseToNumber: getHourParseToNumberEndTime,
      getMinusParseToNumber: getMinusParseToNumberEndtime,
    } = getTime(data.endTime);
    if (isNewAppointment) {
      await addNewCourses({
        title: data.title,
        code: "string",
        description: data.description,
        startTime:
          getHourParseToNumberStartTime + getMinusParseToNumberStartime,
        endTime: getHourParseToNumberEndTime + getMinusParseToNumberEndtime,
        dayOfWeeks: data.dayOfWeeks,
        numOfLessonsPerDay: 0,
        startDate: data.startDate,
        endDate: data.endType === "EndDate" ? data.endDate : null,
        numOfLessons: data.endType !== "EndDate" ? data.numOfLessons : null,
        notiBeforeTime: data.notification,
        notiUnit: EnumNotiUnit.MINUTE,
        endType: data.endType,
        colorCode: data.color.hex,
        token: currentUser.token,
      });
      refetchGetAllEvent();
      visibleChange();
    }
  };
  return (
    <StyledDiv>
      <div className={classes.content}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Create className={classes.icon} color="action" />
          <Controller
            name="title"
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
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <CalendarToday className={classes.icon} color="action" />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label={t(`form.schedule.startDate`)}
                  views={["year", "month", "day"]}
                  renderInput={(params) => (
                    <TextField sx={{ width: 200 }} {...params} />
                  )}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <AlarmIcon className={classes.icon} color="action" />
          <Box>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <TimePicker
                    {...field}
                    label="Start Time"
                    renderInput={(params) => (
                      <TextField
                        sx={{ width: 200, marginRight: 2 }}
                        {...params}
                      />
                    )}
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
                    label="End Time"
                    renderInput={(params) => (
                      <TextField sx={{ width: 200 }} {...params} />
                    )}
                    {...field}
                  />
                </LocalizationProvider>
              )}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <AlarmIcon className={classes.icon} color="action" />
          <Controller
            name="endType"
            control={control}
            render={({ field }) => (
              <Select {...field} sx={{ width: 200, marginRight: 2 }}>
                <MenuItem value="NumberOfLessons">NumberOfLessons</MenuItem>
                <MenuItem value="EndDate">EndDate</MenuItem>
              </Select>
            )}
          />
          {endTypeWatch === "EndDate" && (
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="End date"
                    views={["year", "month", "day"]}
                    renderInput={(params) => (
                      <TextField sx={{ width: 200 }} {...params} />
                    )}
                    {...field}
                  />
                </LocalizationProvider>
              )}
            />
          )}
          {endTypeWatch === "NumberOfLessons" && (
            <Controller
              name="numOfLessons"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{
                    width: 200,
                  }}
                  label="Num Lessons"
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
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <AlarmIcon className={classes.icon} color="action" />
          <Controller
            name="dayOfWeeks"
            control={control}
            render={({ field }) => {
              return (
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel id="label-day-of-week">Day of week</InputLabel>
                  <Select
                    {...field}
                    id="label-day-of-week"
                    displayEmpty
                    multiple
                    label="Day of week"
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{ minWidth: "100px" }}
                    renderValue={(selected) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                          }}
                        >
                          {selected?.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      );
                    }}
                  >
                    {TypeWeekdaysOption.map((day) => {
                      return (
                        <MenuItem key={day.value} value={day.value}>
                          {day.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <AlarmIcon className={classes.icon} color="action" />
          <Controller
            name="notification"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginRight: 2 }}
                defaultValue={0}
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-60]*",
                  min: 0,
                  max: 60,
                }}
              />
            )}
          />
          <Controller
            name="notiUnit"
            control={control}
            render={({ field }) => (
              <FormControl sx={{}}>
                <Select {...field} sx={{}}>
                  <MenuItem value={EnumNotiUnit.MINUTE}>
                    {EnumNotiUnit.MINUTE}
                  </MenuItem>
                  <MenuItem value={EnumNotiUnit.HOUR}>
                    {EnumNotiUnit.HOUR}
                  </MenuItem>
                  <MenuItem value={EnumNotiUnit.DAY}>
                    {EnumNotiUnit.DAY}
                  </MenuItem>
                  <MenuItem value={EnumNotiUnit.WEEK}>
                    {EnumNotiUnit.WEEK}
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <AlarmIcon className={classes.icon} color="action" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "20px", height: "30px" }}>
              {t(`form.schedule.chooseColor`)}
            </Typography>
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
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Notes className={classes.icon} color="action" />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                label="Description"
                className={classes.textField}
                sx={{ marginBottom: 2 }}
                multiline
                rows="6"
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
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
          <LoadingButton
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleSubmit(onSubmitForm)}
          >
            {isNewAppointment ? "Create" : "Save"}
          </LoadingButton>
        </Box>

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
