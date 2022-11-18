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
  addNewCourses,
  updateCourse,
  visible,
  appointmentData,
  commitChanges,
  visibleChange,
  onEditingAppointmentChange,
  cancelAppointment,
  target,
  onHide,
}) {
  const [t] = useTranslation("common");
  const [tabValue, setTabValue] = React.useState("schedule");

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
            <Tab label={t(`tabPanel.schedule`)} value="schedule" />
            <Tab label={t(`tabPanel.task`)} value="task" />
          </TabList>
          <IconButton
            className={classes.closeButton}
            onClick={cancelChanges}
            size="large"
          >
            <Close color="action" />
          </IconButton>
        </Box>

        <TabPanel value="schedule">
          <ScheduleFormAppointment
            addNewCourses={addNewCourses}
            updateCourse={updateCourse}
            visible={visible}
            appointmentData={appointmentData}
            commitChanges={commitChanges}
            visibleChange={visibleChange}
            onEditingAppointmentChange={onEditingAppointmentChange}
            cancelAppointment={cancelAppointment}
            target={target}
            onHide={onHide}
          />
        </TabPanel>
        <TabPanel value="task">
          <TaskFormAppointment
            addNewCourses={addNewCourses}
            visible={visible}
            appointmentData={appointmentData}
            commitChanges={commitChanges}
            visibleChange={visibleChange}
            onEditingAppointmentChange={onEditingAppointmentChange}
            cancelAppointment={cancelAppointment}
            target={target}
            onHide={onHide}
          />
        </TabPanel>
      </TabContext>
    </AppointmentForm.Overlay>
  );
}
