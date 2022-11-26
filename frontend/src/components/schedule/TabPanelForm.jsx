import React from "react";
//package
import { useTranslation } from "react-i18next";

//material
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, IconButton, Tab } from "@mui/material";

//material icon
import { Close } from "@mui/icons-material";

//dx-react-scheduler
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

//component
import { classes } from "./common";
import { ScheduleFormAppointment, TaskFormAppointment } from "./form/index";

export default function TabPanelForm({
  refetchGetAllEvent,
  addNewCourses,
  addNewEvent,
  updateEvent,
  deleteEvent,
  visible,
  appointmentData,
  visibleChange,
  cancelAppointment,
  target,
  onHide,
}) {
  const [t] = useTranslation("common");
  const [tabValue, setTabValue] = React.useState(
    appointmentData.title
      ? appointmentData.courseId
        ? "course"
        : "event"
      : "course"
  );
  const isNewOpen = !appointmentData.title;
  const isShowCourse = appointmentData.courseId;
  const isShowEvent = !appointmentData.courseId;
  //function
  const cancelChanges = () => {
    visibleChange();
    cancelAppointment();
  };
  return (
    <AppointmentForm.Overlay
      visible={visible}
      target={target}
      fullSize={false}
      onHide={onHide}
    >
      <TabContext value={tabValue}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TabList
            onChange={(_, value) => setTabValue(value)}
            aria-label="lab API tabs example"
          >
            {isNewOpen && <Tab label="Course" value="course" />}
            {isNewOpen && <Tab label="Event" value="event" />}
            {isShowCourse && <Tab label="Course" value="course" />}
            {!isNewOpen && isShowEvent && <Tab label="Event" value="event" />}
          </TabList>
          <IconButton
            className={classes.closeButton}
            onClick={cancelChanges}
            size="large"
          >
            <Close color="action" />
          </IconButton>
        </Box>

        <TabPanel value="course">
          <ScheduleFormAppointment
            refetchGetAllEvent={refetchGetAllEvent}
            addNewCourses={addNewCourses}
            appointmentData={appointmentData}
            visibleChange={visibleChange}
          />
        </TabPanel>
        <TabPanel value="event">
          <TaskFormAppointment
            refetchGetAllEvent={refetchGetAllEvent}
            addNewEvent={addNewEvent}
            updateEvent={updateEvent}
            deleteEvent={deleteEvent}
            visibleChange={visibleChange}
            appointmentData={appointmentData}
          />
        </TabPanel>
      </TabContext>
    </AppointmentForm.Overlay>
  );
}
