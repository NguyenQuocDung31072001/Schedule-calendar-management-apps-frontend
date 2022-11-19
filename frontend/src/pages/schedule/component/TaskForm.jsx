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
  TypeWeekdaysOption,
} from "../../../interface/enum";
import { useTranslation } from "react-i18next";
import { Controller, useForm, useWatch } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";
import { CirclePicker } from "react-color";
import { useMutation } from "@tanstack/react-query";
import { addNewEventMutation } from "../../../service/schedule_api";
import { useSelector } from "react-redux";
import { TimePicker } from "@mui/x-date-pickers";

export default function TaskFormAppointment({
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
  const token = useSelector((state) => state.account.token);

  const isNewAppointment = appointmentData.id === undefined;
  console.log(new Date());
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      startTime: new Date(),
      endTime: new Date(),
      colorCode: "",
      notiBeforeTime: 0,
      notiUnit: EnumNotiUnit.MINUTE,
      recurringInterval: 0,
      recurringUnit: EnumRecurringUnit.DAY,
      recurringDetails: [],
      recurringEnd: new Date(),
    },
  });
  const { mutateAsync: addNewEvent } = useMutation(addNewEventMutation);
  const colorWatch = useWatch({
    control: control,
    name: "colorCode",
  });
  const handleSubmitEvent = (formData) => {
    console.log({ formData });
    addNewEvent({
      title: formData.title,
      description: formData.description,
      startTime: formData.startTime,
      endTime: formData.endTime,
      colorCode: formData.colorCode.hex,
      notiBeforeTime: formData.notiBeforeTime,
      notiUnit: formData.notiUnit,
      recurringInterval: formData.recurringInterval,
      recurringUnit: formData.recurringUnit,
      recurringDetails: formData.recurringDetails,
      recurringEnd: formData.recurringEnd,
      token: token,
    });
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
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 1,
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
                label={t(`form.schedule.description`)}
                className={classes.textField}
                multiline
                rows="6"
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
            name="startTime"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="Start time"
                  renderInput={(params) => <TextField {...params} />}
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
            name="endTime"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <TimePicker
                  label="End time"
                  renderInput={(params) => <TextField {...params} />}
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
          <Box>
            <Typography sx={{ marginRight: "20px", height: "30px" }}>
              colorCode
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
                sx={{ marginRight: 2 }}
                variant="outlined"
                label="recurringInterval"
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
                <Select {...field} sx={{}}>
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
                  inputProps={{ "aria-label": "Without label" }}
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
                  label="recurringEnd"
                  views={["year", "month", "day"]}
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              </LocalizationProvider>
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
