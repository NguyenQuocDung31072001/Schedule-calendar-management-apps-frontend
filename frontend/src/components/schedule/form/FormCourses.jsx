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
import { EnumColor, TypeWeekdaysOption } from "../../../interface/enum";
import { CirclePicker } from "react-color";
import { Controller, useForm, useWatch } from "react-hook-form";
import { LoadingButton } from "@mui/lab";

export default function FormCourses() {
  const [selectTypeEndSchedule, setSelectTypeEndSchedule] =
    React.useState("endDate");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      subject: "",
      code: "",
      startDate: "",
      startTime: "",
      endTime: "",
      dayOfWeeks: [],
      endDate: "",
      numOfLessonsPerDay: "",
      numOfLessons: "",
      notification: "",
      description: "",
      color: "",
    },
  });
  const colorWatch = useWatch({
    control: control,
    name: "color",
  });

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
        <Box sx={{ display: "flex", alignItem: "center" }}>
          <CalendarToday className={classes.icon} color="action" />
          <div className={classes.wrapper}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="start date"
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
                  label="start time"
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
                  label="end time"
                  renderInput={(params) => <TextField {...params} />}
                  {...field}
                />
              </LocalizationProvider>
            )}
          />
        </div>
        <Box sx={{ display: "flex", alignItem: "center" }}>
          <AlarmIcon className={classes.icon} color="action" />
          <div className={classes.wrapper}>
            <Controller
              name="dayOfWeeks"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  displayEmpty
                  multiple
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                  sx={{ minWidth: "100px" }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
              )}
            />
          </div>
        </Box>
        <Box sx={{ display: "flex", alignItem: "center" }}>
          <AlarmIcon className={classes.icon} color="action" />
          <div className={classes.wrapper}>
            <FormControl>
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
                              label="end date"
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
              choose color
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
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                label="description"
                className={classes.textField}
                multiline
                rows="6"
              />
            )}
          />
        </div>{" "}
      </div>
    </StyledDiv>
  );
}
