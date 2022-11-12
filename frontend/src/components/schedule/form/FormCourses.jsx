import React from "react";

//dx-react-scheduler-material-ui

//material component
import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";

// material date picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  addNewCoursesMutation,
  updateCoursesMutation,
} from "../../../service/schedule_api";
import { parseTimeToNumber } from "../../../util/time/parseTimeToNumber";
import { getDetailTimeFormNumber } from "../../../util/time/parseNumberToTime";

export default function FormCourses({
  type,
  setOpenModal,
  getAllCourses,
  rowsSelected,
}) {
  const currentUser = useSelector((state) => state.account);

  const [selectTypeEndSchedule, setSelectTypeEndSchedule] =
    React.useState("endDate");
  const { isLoading: isLoadingAddNewCourse, mutateAsync: addNewCourses } =
    useMutation(addNewCoursesMutation);
  const { isLoading: isLoadingUpdateCourse, mutateAsync: updateCourse } =
    useMutation(updateCoursesMutation);
  const { control, handleSubmit } = useForm({
    defaultValues: React.useMemo(() => {
      if (type === "create") {
        return {
          subject: "",
          code: "code example",
          startDate: dayjs(new Date()),
          startTime: dayjs(new Date()),
          endTime: dayjs(new Date()),
          dayOfWeeks: [],
          endDate: dayjs(new Date()),
          numOfLessonsPerDay: 0,
          numOfLessons: 0,
          notiBeforeTime: 5,
          notiUnit: EnumNotiUnit.MINUTE,
          description: "",
          color: "",
        };
      }
      return {
        subject: rowsSelected[0]?.title || "",
        code: rowsSelected[0]?.code || "",
        startDate: dayjs(rowsSelected[0].startDate) || "",
        startTime:
          dayjs(
            new Date(
              `${rowsSelected[0].startDate}T${
                getDetailTimeFormNumber(rowsSelected[0].startTime).H
              }:${getDetailTimeFormNumber(rowsSelected[0].startTime).M}:00`
            )
          ) || " ",
        endTime: dayjs(
          new Date(
            `${rowsSelected[0].startDate}T${
              getDetailTimeFormNumber(rowsSelected[0].endTime).H
            }:${getDetailTimeFormNumber(rowsSelected[0].endTime).M}:00`
          ) || " "
        ),
        dayOfWeeks: rowsSelected[0]?.dayOfWeeks || [],
        endDate: dayjs(rowsSelected[0].endDate),
        numOfLessonsPerDay: rowsSelected[0].numOfLessonsPerDay,
        numOfLessons: rowsSelected[0].numOfLessons,
        notiBeforeTime: rowsSelected[0].notiBeforeTime || 5,
        notiUnit: EnumNotiUnit.MINUTE,
        description: rowsSelected[0].description,
        color: rowsSelected[0].colorCode || "",
      };
    }, [type, rowsSelected]),
  });
  const colorWatch = useWatch({
    control: control,
    name: "color",
  });
  //function
  const renderItem = (item) => {
    return <Box sx={{ marginY: "10px" }}>{item}</Box>;
  };
  const handleAddCourse = (formData) => {
    addNewCourses({
      ...formData,
      startTime: parseTimeToNumber(formData.startTime),
      endTime: parseTimeToNumber(formData.endTime),
      colorCode: formData.color.hex,
      token: currentUser.token,
    }).then((result) => {
      setOpenModal(false);
      getAllCourses();
    });
  };
  const handleUpdateCourse = (formData) => {
    console.log({ update: formData });
    updateCourse({
      id: rowsSelected[0].id,
      ...formData,
      startTime: parseTimeToNumber(formData.startTime),
      endTime: parseTimeToNumber(formData.endTime),
      colorCode: formData.color.hex,
      token: currentUser.token,
    }).then((result) => {
      setOpenModal(false);
      getAllCourses();
    });
  };
  return (
    <StyledDiv>
      <div className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {renderItem(
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    label="Subject"
                    // className={classes.textField}
                    {...field}
                  />
                )}
              />
            )}
            {renderItem(
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
            )}
            {renderItem(
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="start time"
                      renderInput={(params) => <TextField {...params} />}
                      {...field}
                    />
                  </LocalizationProvider>
                )}
              />
            )}
            {renderItem(
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label="end time"
                      renderInput={(params) => <TextField {...params} />}
                      {...field}
                    />
                  </LocalizationProvider>
                )}
              />
            )}
            {renderItem(
              <Controller
                name="dayOfWeeks"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id="label-day-of-week">Day of week</InputLabel>
                    <Select
                      {...field}
                      id="label-day-of-week"
                      displayEmpty
                      multiple
                      label="Day of week"
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ minWidth: "100px" }}
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
          </Grid>
          <Grid item xs={6}>
            {renderItem(
              <FormControl fullWidth>
                <RadioGroup
                  aria-labelledby="choose-end-schedule"
                  name="row-radio-buttons-group"
                  onChange={(e) => setSelectTypeEndSchedule(e.target.value)}
                  defaultValue="endDate"
                >
                  <FormControlLabel
                    sx={{
                      minWidth: "200px",
                      width: "100%",
                    }}
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
                                sx={{ width: "100%" }}
                                disabled={selectTypeEndSchedule !== "endDate"}
                                label="end date"
                                views={["year", "month", "day"]}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    sx={{ width: "100%" }}
                                  />
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
                    sx={{
                      minWidth: "200px",
                      width: "100%",
                    }}
                    value="numOfLessons"
                    control={<Radio />}
                    label={
                      <>
                        <Controller
                          sx={{}}
                          name="numOfLessons"
                          control={control}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              sx={{
                                marginTop: 2,
                                minWidth: "200px",
                                width: "100%",
                              }}
                              disabled={
                                selectTypeEndSchedule !== "numOfLessons"
                              }
                              label="numLessons"
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
            )}
            {renderItem(
              <Controller
                name="notiBeforeTime"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ marginLeft: "30px" }}>
                    <InputLabel id="notification-select">
                      Notification
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="notification-select"
                      sx={{ width: "200px" }}
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
            )}
            {renderItem(
              <Box sx={{ marginLeft: "30px" }}>
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
            )}
            {renderItem(
              <Box sx={{ marginLeft: "30px" }}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      label="description"
                      multiline
                      rows="4"
                    />
                  )}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <LoadingButton
          variant="contained"
          onClick={
            type === "create"
              ? handleSubmit(handleAddCourse)
              : handleSubmit(handleUpdateCourse)
          }
          loading={isLoadingAddNewCourse || isLoadingUpdateCourse}
        >
          {type === "create" ? "Add New Course" : "Update Course"}
        </LoadingButton>
      </Box>
    </StyledDiv>
  );
}
