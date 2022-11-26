import React from "react";

//material component
import {
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

//material icon
import Notes from "@mui/icons-material/Notes";
import Create from "@mui/icons-material/Create";
import AlarmIcon from "@mui/icons-material/Alarm";

// material date picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// common component
import { StyledDiv, classes } from "../../../components/schedule/common";
import {
  EnumColor,
  EnumNotiUnit,
  EnumRecurringUnit,
  EnumTargetType,
  TypeWeekdaysOption,
} from "../../../interface/enum";
import { useTranslation } from "react-i18next";
import { Controller, useForm, useWatch } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { CirclePicker } from "react-color";
import { useSelector } from "react-redux";
import { TimePicker } from "@mui/x-date-pickers";
import { getTime } from "../../../util/time/getTime";

export default function TaskFormAppointment({
  refetchGetAllEvent,
  addNewEvent,
  updateEvent,
  deleteEvent,
  visibleChange,
  appointmentData,
}) {
  //state | data | hook get data
  const [t] = useTranslation("common");
  const token = useSelector((state) => state.account.token);
  console.log({ appointmentData });
  const isNewAppointment = appointmentData.id === undefined;
  const { control, handleSubmit } = useForm({
    defaultValues: React.useMemo(() => {
      if (!isNewAppointment) {
        return {
          title: appointmentData.title,
          description: appointmentData.description,
          startDate: appointmentData.startTime,
          startTime: appointmentData.startTime,
          endTime: appointmentData.endTime,
          colorCode: appointmentData.colorCode,
          notiBeforeTime: appointmentData.notiBeforeTime,
          notiUnit: appointmentData.notiUnit,
          recurringInterval: appointmentData.recurringInterval,
          recurringUnit: appointmentData.recurringUnit,
          recurringDetails: appointmentData.recurringDetails,
          recurringEnd: appointmentData.recurringEnd,
          beforeStartTime: appointmentData.startTime,
          recurringStart: appointmentData.recurringStart,
          id: appointmentData.id,
          baseEventId: appointmentData.baseEventId,
          cloneEventId: appointmentData.cloneEventId,
          targetType: EnumTargetType.THIS,
        };
      }
      return {
        title: "",
        description: "",
        startDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        colorCode: "",
        notiBeforeTime: 0,
        notiUnit: EnumNotiUnit.MINUTE,
        recurringInterval: 0,
        recurringUnit: EnumRecurringUnit.DAY,
        recurringDetails: [],
        recurringEnd: new Date(),
        baseEventId: "",
        cloneEventId: "",
        targetType: EnumTargetType.THIS,
      };
    }, [appointmentData]),
  });
  const colorWatch = useWatch({
    control: control,
    name: "colorCode",
  });
  const recurringUnitWatch = useWatch({
    control: control,
    name: "recurringUnit",
  });
  const handleSubmitEvent = async (formData) => {
    console.log({ formData });
    const parseStartDate = getTime(formData.startDate);
    const parseStartTime = getTime(formData.startTime);
    console.log({ parseStartTime });
    const parseEndTime = getTime(formData.endTime);

    if (isNewAppointment) {
      await addNewEvent({
        title: formData.title,
        description: formData.description,
        startTime: `${parseStartDate.getYear}-${parseStartDate.getMonth}-${parseStartDate.getDay}T${parseStartTime.getHour}:${parseStartTime.getMinus}:00:000Z`,
        endTime: `${parseStartDate.getYear}-${parseStartDate.getMonth}-${parseStartDate.getDay}T${parseEndTime.getHour}:${parseEndTime.getMinus}:00:000Z`,
        colorCode: formData.colorCode.hex,
        notiBeforeTime: formData.notiBeforeTime,
        notiUnit: formData.notiUnit,
        recurringInterval: formData.recurringInterval,
        recurringUnit: formData.recurringUnit,
        recurringDetails: formData.recurringDetails,
        recurringEnd: formData.recurringEnd,
        token: token,
      });
      refetchGetAllEvent();
      visibleChange();
      return;
    }
    await updateEvent({
      title: formData.title,
      description: formData.description,
      beforeStartTime: formData.startTime,
      startTime: `${parseStartDate.getYear}-${parseStartDate.getMonth}-${parseStartDate.getDay}T${parseStartTime.getHour}:${parseStartTime.getMinus}:00:000Z`,
      endTime: `${parseStartDate.getYear}-${parseStartDate.getMonth}-${parseStartDate.getDay}T${parseEndTime.getHour}:${parseEndTime.getMinus}:00:000Z`,
      colorCode: formData.colorCode.hex,
      notiBeforeTime: formData.notiBeforeTime,
      notiUnit: formData.notiUnit,
      recurringStart: formData.recurringStart,
      recurringInterval: formData.recurringInterval,
      recurringUnit: formData.recurringUnit,
      recurringDetails: formData.recurringDetails,
      recurringEnd: formData.recurringEnd,
      id: formData.id,
      baseEventId: formData.baseEventId,
      cloneEventId: formData.cloneEventId,
      targetType: formData.targetType,
      token: token,
    });
    refetchGetAllEvent();
    visibleChange();
  };

  return (
    <StyledDiv>
      <div>
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
          <AlarmIcon className={classes.icon} color="action" />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => {
              return (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    {...field}
                    label="Choose Date"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              );
            }}
          />
          <Controller
            name="startTime"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  {...field}
                  label="Start time"
                  renderInput={(params) => <TextField {...params} />}
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
                  {...field}
                  label="End time"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
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
          <AlarmIcon className={classes.icon} color="action" />
          <Controller
            name="notiBeforeTime"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                label="notiBeforeTime"
                sx={{ marginRight: 2 }}
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-60]*",
                  min: 0,
                  max: 60,
                }}
                {...field}
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
            marginTop: 1,
          }}
        >
          <AlarmIcon className={classes.icon} color="action" />
          <Controller
            name="recurringInterval"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{ marginRight: 2, width: 100 }}
                variant="outlined"
                label="Recurring Interval"
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-60]*",
                  min: 0,
                  max: 60,
                }}
                {...field}
              />
            )}
          />
          <Controller
            name="recurringUnit"
            control={control}
            render={({ field }) => (
              <FormControl sx={{}}>
                <Select {...field} sx={{ width: 150 }}>
                  <MenuItem value={EnumRecurringUnit.DAY}>
                    {EnumRecurringUnit.DAY}
                  </MenuItem>
                  <MenuItem value={EnumRecurringUnit.WEEK}>
                    {EnumRecurringUnit.WEEK}
                  </MenuItem>
                  <MenuItem value={EnumRecurringUnit.MONTH}>
                    {EnumRecurringUnit.MONTH}
                  </MenuItem>
                  <MenuItem value={EnumRecurringUnit.YEAR}>
                    {EnumRecurringUnit.YEAR}
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {recurringUnitWatch !== EnumRecurringUnit.DAY && (
            <Controller
              name="recurringDetails"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel id="label-recurring-details">
                    Recurring Details
                  </InputLabel>
                  <Select
                    {...field}
                    id="label-recurring-details"
                    displayEmpty
                    multiple
                    label="Recurring Details"
                    // inputProps={{ "aria-label": "Without label" }}
                    sx={{ minWidth: "100px", marginLeft: 1 }}
                    renderValue={(selected) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 0.5,
                        }}
                      >
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
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
            name="recurringEnd"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Recurring End"
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
            justifyContent: "start",
            alignItems: "center",
            marginTop: 1,
          }}
        >
          <AlarmIcon className={classes.icon} color="action" />
          <Controller
            name="targetType"
            control={control}
            render={({ field }) => {
              return (
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel id="select-target-type">Target Type</InputLabel>
                  <Select
                    {...field}
                    labelId="select-target-type"
                    id="select-target-type"
                    label="Target Type"
                    defaultValue={EnumTargetType.THIS}
                  >
                    {[
                      EnumTargetType.ALL,
                      EnumTargetType.THIS,
                      EnumTargetType.THIS_AND_FOLLOWING,
                    ].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
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
          <Box>
            <Typography sx={{ marginRight: "20px", height: "30px" }}>
              Color Code
            </Typography>
            <Controller
              name="colorCode"
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
            marginTop: 1,
            marginBottom: 2,
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
                multiline
                rows="6"
              />
            )}
          />
        </Box>
      </div>
      <div className={classes.buttonGroup}>
        {!isNewAppointment && (
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={() => {}}
          >
            {t(`form.task.delete`)}
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          onClick={handleSubmit(handleSubmitEvent)}
        >
          {isNewAppointment ? t(`form.task.create`) : t(`form.task.save`)}
        </Button>
      </div>
    </StyledDiv>
  );
}

/* eslint-disable-next-line react/no-multi-comp */
