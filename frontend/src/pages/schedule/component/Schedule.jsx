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
import { Checkbox, LinearProgress, Typography } from "@mui/material";

//data fake
import { Resource } from "../../../fake_data/Resource";
import TabPanelForm from "../../../components/schedule/TabPanelForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewCoursesMutation,
  addNewEventMutation,
  deleteCoursesMutation,
  deleteEventMutation,
  getAllEventQuery,
  updateCoursesMutation,
  updateEventMutation,
} from "../../../service/schedule_api";
import { getFromDate_ToDate } from "../../../util/getFromDate_ToDate";
import { Box } from "@mui/system";
import { EnumTargetType, EnumTypeGetEvent } from "../../../interface/enum";

const startDayHour = 0;
const endDayHour = 23;

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
        fromDate: getFormDate_toDate.fromDate,
        toDate: getFormDate_toDate.toDate,
      }),
    {
      // retry: 1
      enabled: false,
    }
  );
  //api courses
  const { mutateAsync: addNewCourses, isLoading: isLoadingAddNewCourses } =
    useMutation(addNewCoursesMutation);
  const { mutateAsync: deleteCourses, isLoading: isLoadingDelete } =
    useMutation(deleteCoursesMutation);
  const { mutateAsync: updateCourse, isLoading: isLoadingUpdateCourse } =
    useMutation(updateCoursesMutation);
  //api event
  const { mutateAsync: addNewEvent } = useMutation(addNewEventMutation);
  const { mutateAsync: updateEvent, isLoading: isLoadingUpdateEvent } =
    useMutation(updateEventMutation);
  const { mutateAsync: deleteEvent } = useMutation(deleteEventMutation);

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
  }, [typeGetEvent, currentDate]);
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
        startTime: startDateChange,
        endTime: endDateChange,
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
          isLoadingUpdateCourse ||
          isLoadingDelete ||
          isLoadingUpdateEvent) && <LinearProgress />}
        <Scheduler
          data={dataRender}
          locale={["vi-VI", "en-US"]}
          firstDayOfWeek={1}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={(e) => {
              console.log({ e });
              setCurrentDate(e);
            }}
            // currentViewName="weak"
            onCurrentViewNameChange={(e) => console.log("view change ", e)}
          />
          <EditingState
            onCommitChanges={(e) => {
              commitChanges(e);
            }}
            onEditingAppointmentChange={(editingAppointment) => {
              setEditingAppointment(editingAppointment);
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
          <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
          <Toolbar
            flexibleSpaceComponent={() => (
              <Box sx={{ display: "flex", width: "45%", marginX: "50px" }}>
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
            visible={false}
            onVisibilityChange={() => setEditFormVisible(!editFormVisible)}
          />
          <DragDropProvider
            allowDrag={(appointment) => {
              return appointment.courseId ? false : true;
            }}
          />
          <Resources data={Resource} mainResourceName="color" />
        </Scheduler>
      </Box>
    </Box>
  );
}
