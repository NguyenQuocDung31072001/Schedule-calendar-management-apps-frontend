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
import { Paper } from "@mui/material";

//material icon
import AddIcon from "@mui/icons-material/Add";

// common component
import { StyledFab, classes } from "../../../components/schedule/common";

//data fake
import { EnumTypeAppointment } from "../../../interface/enum";
import { Resource } from "../../../fake_data/Resource";
import TabPanelForm from "../../../components/schedule/TabPanelForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEventQuery } from "../../../service/schedule_api";
import { getFromDate_ToDate } from "../../../util/getFromDate_ToDate";

const startDayHour = 9;
const endDayHour = 19;

export default function Schedule() {
  //data || hook get data
  const queryClient = useQueryClient();
  const token = useSelector((state) => state.account.token);

  const [dataRender, setDateRender] = React.useState([
    {
      title: "Môn toán 1",
      startDate: new Date(2022, 9, 12, 12, 35),
      endDate: new Date(2022, 9, 12, 15, 0),
      id: 0,
      color: [1],
    },
  ]);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [editingAppointment, setEditingAppointment] = React.useState();
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isNewAppointment, setIsNewAppointment] = React.useState(false);

  const { data } = useQuery(
    ["getAllEvent"],
    () =>
      getAllEventQuery({
        token: token,
        fromDate: getFromDate_ToDate(currentDate).fromDate,
        toDate: getFromDate_ToDate(currentDate).toDate,
      }),
    {
      retry: 1,
    }
  );
  console.log({ data });
  React.useEffect(() => {
    console.log({ currentDate });
    queryClient.invalidateQueries(["getAllEvent"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  //function
  const onEditingAppointmentChange = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  const changeFormVisible = () => {
    setEditFormVisible(!editFormVisible);
  };
  const commitChanges = (value) => {
    if (value.type === EnumTypeAppointment.Add) {
      setDateRender((prev) => [
        ...prev,
        {
          id:
            dataRender.length > 0
              ? dataRender[dataRender.length - 1].id + 1
              : 1,
          title: value.subject,
          startDate: value.startDate,
          endDate: value.endDate,
          notes: value.notes,
          color: value.color,
        },
      ]);
    } else if (value.type === EnumTypeAppointment.Change) {
      let _dataRender = dataRender.map((data) => {
        if (data.id === value.id) {
          data.title = value.subject;
          data.startDate = value.startDate;
          data.endDate = value.endDate;
          data.notes = value.notes;
          data.color = value.color;
        }
        return data;
      });
      setDateRender(_dataRender);
    } else if (value.changed) {
      let _dataRender = dataRender.map((data) => {
        if (data.id === editingAppointment.id) {
          data.startDate = value.changed[data.id].startDate;
          data.endDate = value.changed[data.id].endDate;
        }
        return data;
      });
      setDateRender(_dataRender);
    } else {
      setDateRender(dataRender.filter((data) => data.id !== value.deleted));
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
      visible: editFormVisible,
      appointmentData: currentAppointment,
      commitChanges: commitChanges,
      visibleChange: changeFormVisible,
      onEditingAppointmentChange: onEditingAppointmentChange,
      cancelAppointment,
    };
  });
  return (
    <Paper>
      <Scheduler data={dataRender} height={1000}>
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

      <StyledFab
        color="secondary"
        className={classes.addButton}
        onClick={() => {
          setEditFormVisible(true);
          // onEditingAppointmentChange(undefined);
          // onAddedAppointmentChange({
          //   startDate: new Date(currentDate).setHours(startDayHour),
          //   endDate: new Date(currentDate).setHours(startDayHour + 1),
          // });
        }}
      >
        <AddIcon />
      </StyledFab>
    </Paper>
  );
}
