import * as React from "react";
import { useSelector } from "react-redux";
//dx-react-scheduler-material-ui
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  DateNavigator,
  TodayButton,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";

//material component
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

//data fake
import { Resource } from "../../../fake_data/Resource";
import TabPanelForm from "../../../components/schedule/TabPanelForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewCoursesMutation,
  addNewEventMutation,
  dayOffCoursesMutation,
  deleteEventMutation,
  getAllEventQuery,
  updateEventMutation,
} from "../../../service/schedule_api";
import { getFromDate_ToDate } from "../../../util/getFromDate_ToDate";
import { Box } from "@mui/system";
import { EnumTargetType, EnumTypeGetEvent } from "../../../interface/enum";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
const startDayHour = 0;
const endDayHour = 23;
const enumViewName = {
  Week: "Week",
  Month: "Month",
};
export default function Schedule() {
  //data || hook get data
  const token = useSelector((state) => state.account.token);

  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [editingAppointment, setEditingAppointment] = React.useState();
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isNewAppointment, setIsNewAppointment] = React.useState(false);
  const [typeGetEvent, setTypeGetEvent] = React.useState(EnumTypeGetEvent.All);
  const [isCourseChecked, setIsCourseChecked] = React.useState(false);
  const [isEventChecked, setIsEventChecked] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [viewName, setViewName] = React.useState(enumViewName.Week);
  const getFormDate_toDate = getFromDate_ToDate(currentDate);
  const {
    data,
    isLoading: isLoadingGetAllEvent,
    isFetching: isFetchingGetAllEvent,
    refetch: refetchGetAllEvent,
  } = useQuery(
    ["getAllEvent"],
    () =>
      getAllEventQuery({
        token: token,
        type: typeGetEvent,
        fromDate:
          viewName === enumViewName.Week
            ? getFormDate_toDate.fromDate
            : getFormDate_toDate.fromDateMonth,
        toDate:
          viewName === enumViewName.Week
            ? getFormDate_toDate.toDate
            : getFormDate_toDate.toDateMonth,
      }),
    {
      // retry: 1
      enabled: false,
    }
  );
  //api courses
  const { mutateAsync: addNewCourses, isLoading: isLoadingAddNewCourses } =
    useMutation(addNewCoursesMutation);
  const { mutateAsync: dayOffCourses, isLoading: isLoadingDayOffCourses } =
    useMutation(dayOffCoursesMutation);
  //api event
  const { mutateAsync: addNewEvent } = useMutation(addNewEventMutation);
  const { mutateAsync: updateEvent, isLoading: isLoadingUpdateEvent } =
    useMutation(updateEventMutation);
  const { mutateAsync: deleteEvent, isLoading: isLoadingDeleteEvent } =
    useMutation(deleteEventMutation);

  const dataResponse = data?.data?.data;
  const dataRender = React.useMemo(() => {
    if (!dataResponse) return [];
    return dataResponse.map((item) => {
      return {
        ...item,
        title: item.title,
        startDate: item.startTime,
        endDate: item.endTime,
        id: item.id,
        color: Resource[0]?.instances?.find(
          (resource) => resource.color === item.colorCode
        )
          ? [
              Resource[0]?.instances?.find(
                (resource) => resource.color === item.colorCode
              ).id,
            ]
          : [],
      };
    });
  }, [dataResponse]);

  React.useEffect(() => {
    refetchGetAllEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeGetEvent, currentDate, viewName]);
  React.useEffect(() => {
    handleChecked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCourseChecked, isEventChecked]);
  //function
  const handleChecked = () => {
    if (
      (isCourseChecked && isEventChecked) ||
      (!isCourseChecked && !isEventChecked)
    ) {
      setTypeGetEvent(EnumTypeGetEvent.All);
      return;
    }
    if (isCourseChecked) {
      setTypeGetEvent(EnumTypeGetEvent.Course);
      return;
    }
    if (isEventChecked) {
      setTypeGetEvent(EnumTypeGetEvent.Event);
      return;
    }
  };
  const onEditingAppointmentChange = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  const changeFormVisible = () => {
    setEditFormVisible(!editFormVisible);
  };
  const commitChanges = async (value) => {
    console.log({ valueChange: value["changed"] });
    if (value["changed"]) {
      let id = Object.keys(value["changed"]);
      const startDateChange = value["changed"][id[0]].startDate;
      const endDateChange = value["changed"][id[0]].endDate;
      const dataChanged = data.data.data.find(
        (item) => item.id.toString() === id[0]
      );
      await updateEvent({
        title: null,
        description: null,
        beforeStartTime: dataChanged.startTime,
        startTime: new Date(
          startDateChange.getTime() -
            startDateChange.getTimezoneOffset() * 60000
        ).toISOString(),
        endTime: new Date(
          endDateChange.getTime() - endDateChange.getTimezoneOffset() * 60000
        ).toISOString(),
        colorCode: null,
        notiBeforeTime: null,
        notiUnit: null,
        recurringStart: null,
        recurringInterval: null,
        recurringUnit: null,
        recurringDetails: null,
        recurringEnd: null,
        id: dataChanged.id,
        baseEventId: dataChanged.baseEventId,
        cloneEventId: dataChanged.cloneEventId,
        targetType: EnumTargetType.THIS,
        token: token,
      });
      refetchGetAllEvent();
      return;
    }
    if (value.deleted) {
      console.log({ value });
      // deleteCourses({
      //   id: value.deleted,
      //   token: token,
      // });
      return;
    }
  };
  const appointmentFormSchedule = connectProps(TabPanelForm, () => {
    console.log({ editingAppointment });
    let currentAppointment =
      dataRender.filter(
        (appointment) =>
          editingAppointment && appointment.id === editingAppointment.id
      )[0] || addedAppointment;
    const cancelAppointment = () => {
      if (isNewAppointment) {
        setEditingAppointment();
        setIsNewAppointment(false);
      }
    };
    return {
      refetchGetAllEvent,
      addNewCourses,
      addNewEvent,
      updateEvent,
      deleteEvent,
      visible: editFormVisible,
      appointmentData: currentAppointment,
      commitChanges: commitChanges,
      visibleChange: changeFormVisible,
      onEditingAppointmentChange: onEditingAppointmentChange,
      cancelAppointment,
    };
  });
  return (
    <Box>
      <Box sx={{ width: "100%", height: "85vh", position: "relative" }}>
        {(isLoadingGetAllEvent ||
          isFetchingGetAllEvent ||
          isLoadingUpdateEvent) && <LinearProgress />}
        <Scheduler
          data={dataRender}
          locale={["vi-VI", "en-US"]}
          firstDayOfWeek={1}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={(e) => {
              setCurrentDate(e);
            }}
            // currentViewName="weak"
            onCurrentViewNameChange={(e) => setViewName(e)}
          />
          <EditingState
            onCommitChanges={(e) => {
              commitChanges(e);
              console.log({ e });
            }}
            onEditingAppointmentChange={(editingAppointment) => {
              setEditingAppointment(editingAppointment);
              console.log({ alo: editingAppointment });
            }}
            onAddedAppointmentChange={(newAppoiment) => {
              changeFormVisible();
              setAddedAppointment(newAppoiment);
              setEditingAppointment();
            }}
          />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
            cellDuration={45}
          />
          <MonthView />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <Appointments />
          <AppointmentTooltip
            headerComponent={({ appointmentData }) => {
              return (
                <div className=" flex justify-end">
                  {appointmentData.courseId && (
                    <RemoveCircleIcon
                      className="cursor-pointer"
                      onClick={async () => {
                        await dayOffCourses({
                          id: appointmentData.courseId,
                          date: appointmentData.startDate,
                          token: token,
                        });
                        refetchGetAllEvent();
                      }}
                    />
                  )}
                  {!appointmentData.courseId && (
                    <EditIcon
                      className="cursor-pointer"
                      onClick={() => {
                        setEditingAppointment(appointmentData);
                        setEditFormVisible(true);
                      }}
                    />
                  )}

                  {!appointmentData.courseId && (
                    <DeleteIcon
                      className="cursor-pointer"
                      onClick={async () => {
                        await deleteEvent({
                          baseEventId: appointmentData.baseEventId,
                          cloneEventId: appointmentData.cloneEventId,
                          id: appointmentData.id,
                          startTime: appointmentData.startTime,
                          targetType: appointmentData.targetType,
                          token: token,
                        });
                        refetchGetAllEvent();
                      }}
                    />
                  )}
                </div>
              );
            }}
          />
          <Toolbar
            flexibleSpaceComponent={() => (
              <Box
                sx={{
                  display: "flex",
                  width: "200px",
                  marginX: "50px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography>Course</Typography>
                  <Checkbox
                    checked={isCourseChecked}
                    onChange={(e) => setIsCourseChecked(e.target.checked)}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography>Event</Typography>
                  <Checkbox
                    checked={isEventChecked}
                    onChange={(e) => setIsEventChecked(e.target.checked)}
                  />
                </Box>
              </Box>
            )}
          />
          <DateNavigator />
          <ViewSwitcher />
          <TodayButton />
          <AppointmentForm
            overlayComponent={appointmentFormSchedule}
            onVisibilityChange={() => {
              setEditFormVisible(!editFormVisible);
            }}
          />
          <DragDropProvider
            allowDrag={(appointment) => {
              return appointment.courseId ? false : true;
            }}
            allowResize={(appointment) => {
              return appointment.courseId ? false : true;
            }}
          />
          <Resources data={Resource} mainResourceName="color" />
        </Scheduler>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>{" "}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="outlined">
              Cancel
            </Button>
            <Button color="secondary" variant="outlined">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
