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
import { LinearProgress } from "@mui/material";

//data fake
import { Resource } from "../../../fake_data/Resource";
import TabPanelForm from "../../../components/schedule/TabPanelForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addNewCoursesMutation,
  deleteCoursesMutation,
  getAllEventQuery,
  updateCoursesMutation,
} from "../../../service/schedule_api";
import { getFromDate_ToDate } from "../../../util/getFromDate_ToDate";
import { parseNumberToTime } from "../../../util/time/parseNumberToTime";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { getTime } from "../../../util/time/getTime";

const startDayHour = 9;
const endDayHour = 19;

export default function Schedule() {
  //data || hook get data
  const token = useSelector((state) => state.account.token);

  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [editingAppointment, setEditingAppointment] = React.useState();
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isNewAppointment, setIsNewAppointment] = React.useState(false);

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
        fromDate: getFromDate_ToDate(currentDate).fromDate,
        toDate: getFromDate_ToDate(currentDate).toDate,
      }),
    {
      // retry: 1
      enabled: false,
    }
  );
  const { mutateAsync: deleteCourses, isLoading: isLoadingDelete } =
    useMutation(deleteCoursesMutation);

  const { mutateAsync: addNewCourses, isLoading: isLoadingAddNewCourses } =
    useMutation(addNewCoursesMutation, {
      onSuccess: () => {
        console.log("add schedule success");
      },
      onError: () => {
        console.log("add schedule error");
      },
    });
  const { mutateAsync: updateCourse, isLoading: isLoadingUpdateCourse } =
    useMutation(updateCoursesMutation);

  const dataResponse = data?.data?.data;
  const dataRender = React.useMemo(() => {
    if (!dataResponse) return [];
    return dataResponse.map((item) => {
      return {
        ...item,
        title: item.title,
        startDate:
          item.startDate.split("T")[0] +
          "T" +
          parseNumberToTime(item.startTime),
        endDate:
          item.startDate.split("T")[0] + "T" + parseNumberToTime(item.endTime),
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
  }, [
    currentDate,
    isLoadingDelete,
    isLoadingAddNewCourses,
    isLoadingUpdateCourse,
  ]);

  //function
  const onEditingAppointmentChange = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  const changeFormVisible = () => {
    setEditFormVisible(!editFormVisible);
  };
  const commitChanges = (value) => {
    if (value["changed"]) {
      let id = Object.keys(value["changed"]);
      const {
        getHourParseToNumber: getHourParseToNumberStartTime,
        getMinusParseToNumber: getMinusParseToNumberStartTime,
      } = getTime(value["changed"][Number(id[0])].startDate);
      const {
        getHourParseToNumber: getHourParseToNumberEndTime,
        getMinusParseToNumber: getMinusParseToNumberEndTime,
      } = getTime(value["changed"][Number(id[0])].endDate);
      const startDateChange = value["changed"][Number(id[0])].startDate;
      const endDateChange = value["changed"][Number(id[0])].endDate;
      const dataChanged = data.data.data.find(
        (item) => item.id.toString() === id[0]
      );
      updateCourse({
        ...dataChanged,
        id: id,
        startDate: dayjs(startDateChange),
        endDate: dayjs(endDateChange),
        startTime:
          getHourParseToNumberStartTime + getMinusParseToNumberStartTime,
        endTime: getHourParseToNumberEndTime + getMinusParseToNumberEndTime,
        token: token,
      });
      return;
    }
    if (value.deleted) {
      deleteCourses({
        id: value.deleted,
        token: token,
      });
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
      addNewCourses,
      updateCourse,
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
      <Box sx={{ width: 800, height: 900 }}>
        {(isLoadingGetAllEvent ||
          isFetchingGetAllEvent ||
          isLoadingUpdateCourse ||
          isLoadingDelete) && <LinearProgress />}
        <Scheduler data={dataRender}>
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={(e) => {
              setCurrentDate(e);
            }}
            // currentViewName="weak"
            // onCurrentViewNameChange={(e) => console.log("view change ", e)}
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
          <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />
          <MonthView />
          <AllDayPanel />
          <EditRecurrenceMenu />
          <Appointments />
          <AppointmentTooltip showOpenButton showCloseButton showDeleteButton />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
          <TodayButton />
          <AppointmentForm
            overlayComponent={appointmentFormSchedule}
            visible={editFormVisible}
            onVisibilityChange={() => setEditFormVisible(!editFormVisible)}
          />
          <DragDropProvider allowDrag={() => true} />
          <Resources data={Resource} mainResourceName="color" />
        </Scheduler>
      </Box>
    </Box>
  );
}
