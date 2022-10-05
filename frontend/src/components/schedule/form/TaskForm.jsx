import React from "react";

//dx-react-scheduler-material-ui
import { AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";

//material component
import { Button, IconButton, TextField } from "@mui/material";

//material icon
import Notes from "@mui/icons-material/Notes";
import Close from "@mui/icons-material/Close";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";

// material date picker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// common component
import { StyledDiv, classes } from "../common";
import { EnumTypeAppointment } from "../../../interface/enum";

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
  const [appointmentChanges, setAppointmentChanges] =
    React.useState(appointmentData);
  const isNewAppointment = appointmentData.id === undefined;

  const applyChanges = isNewAppointment
    ? () => commitAppointment(EnumTypeAppointment.Add)
    : () => commitAppointment(EnumTypeAppointment.Change);

  //funtion

  const commitAppointment = (type) => {
    console.log(appointmentChanges);
    switch (type) {
      case EnumTypeAppointment.Add:
        commitChanges({ [type]: appointmentChanges });
        break;
      case EnumTypeAppointment.Change:
        commitChanges({
          [type]: { [appointmentChanges.id]: appointmentChanges },
        });
        break;
      case EnumTypeAppointment.Delete:
        commitChanges({ [type]: appointmentChanges.id });
        break;
      default:
    }
  };

  const textEditorProps = (field) => ({
    variant: "outlined",
    onChange: (event) => {
      setAppointmentChanges({
        ...appointmentChanges,
        [field]: event.target.value,
      });
    },
    value: appointmentChanges[field] || "",
    label: field[0].toUpperCase() + field.slice(1),
    className: classes.textField,
  });

  const pickerEditorProps = (field) => ({
    keyboard: true,
    onChange: (event) => {
      // console.log(event._d)  xx
      // console.log(event._d.getDate())
      // console.log(event._d.getMonth())
      // console.log(event._d.getFullYear())
      // console.log(event._d.getHours())
      // console.log(event._d.getMinutes())
      setAppointmentChanges({
        ...appointmentChanges,
        [field]: event._d,
      });
    },
    value: appointmentChanges[field],
    // ampm: false,
    inputFormat: "DD/MM/YYYY HH:mm",
    onError: () => null,
  });
  const startDatePickerProps = pickerEditorProps("startDate");
  const endDatePickerProps = pickerEditorProps("endDate");

  const cancelChanges = () => {
    setAppointmentChanges({});
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
      <StyledDiv>
        <div className={classes.header}>
          <IconButton
            className={classes.closeButton}
            onClick={cancelChanges}
            size="large"
          >
            <Close color="action" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div className={classes.wrapper}>
            <Create className={classes.icon} color="action" />
            <TextField {...textEditorProps("title")} />
          </div>
          <div className={classes.wrapper}>
            <CalendarToday className={classes.icon} color="action" />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                label="Start Date"
                renderInput={(props) => (
                  <TextField className={classes.picker} {...props} />
                )}
                {...startDatePickerProps}
              />
              <DateTimePicker
                label="End Date"
                renderInput={(props) => (
                  <TextField className={classes.picker} {...props} />
                )}
                {...endDatePickerProps}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.wrapper}>
            <Notes className={classes.icon} color="action" />
            <TextField {...textEditorProps("notes")} multiline rows="6" />
          </div>
        </div>
        <div className={classes.buttonGroup}>
          {!isNewAppointment && (
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              onClick={() => {
                visibleChange();
                commitAppointment("deleted");
              }}
            >
              Delete
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => {
              visibleChange();
              applyChanges();
            }}
          >
            {isNewAppointment ? "Create" : "Save"}
          </Button>
        </div>
      </StyledDiv>
    </AppointmentForm.Overlay>
  );
}

/* eslint-disable-next-line react/no-multi-comp */
