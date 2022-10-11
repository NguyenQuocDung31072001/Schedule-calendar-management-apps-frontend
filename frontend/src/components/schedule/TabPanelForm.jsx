import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { Close } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, IconButton, Tab } from "@mui/material";
import React from "react";
import { classes } from "./common";
import { ScheduleFormAppointment, TaskFormAppointment } from "./form/index";

export default function TabPanelForm({
  visible,
  appointmentData,
  commitChanges,
  visibleChange,
  onEditingAppointmentChange,
  cancelAppointment,
  target,
  onHide,
}) {
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
            <Tab label="Schedule" value="schedule" />
            <Tab label="Task" value="task" />
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
