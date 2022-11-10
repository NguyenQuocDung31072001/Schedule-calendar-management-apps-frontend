import React from "react";

//dx-react-scheduler-material-ui

//material component
import { Button, TextField } from "@mui/material";

//material icon
import Notes from "@mui/icons-material/Notes";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Create from "@mui/icons-material/Create";

// material date picker
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// common component
import { StyledDiv, classes } from "../common";
import { EnumTypeAppointment } from "../../../interface/enum";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";

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
  const [t] = useTranslation("common");
  const [appointmentChanges, setAppointmentChanges] =
    React.useState(appointmentData);
  const isNewAppointment = appointmentData.id === undefined;

  const { control } = useForm({
    defaultValues: {},
  });
  const applyChanges = isNewAppointment
    ? () => commitAppointment(EnumTypeAppointment.Add)
    : () => commitAppointment(EnumTypeAppointment.Change);

  //funtion

  const commitAppointment = (type) => {
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

  return (
    <StyledDiv>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Create className={classes.icon} color="action" />
          <TextField {...textEditorProps(t(`form.task.title`))} />
        </div>
        <div className={classes.wrapper}>
          <CalendarToday className={classes.icon} color="action" />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                  label={t(`form.task.startDate`)}
                  renderInput={(props) => (
                    <TextField className={classes.picker} {...props} />
                  )}
                  {...field}
                />
                {/* <DateTimePicker
                  label={t(`form.task.endDate`)}
                  renderInput={(props) => (
                    <TextField className={classes.picker} {...props} />
                  )}
                  {...endDatePickerProps}
                /> */}
              </LocalizationProvider>
            )}
          />
        </div>
        <div className={classes.wrapper}>
          <Notes className={classes.icon} color="action" />
          <TextField
            {...textEditorProps(t(`form.task.notes`))}
            multiline
            rows="6"
          />
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
            {t(`form.task.delete`)}
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
          {isNewAppointment ? t(`form.task.create`) : t(`form.task.save`)}
        </Button>
      </div>
    </StyledDiv>
  );
}

/* eslint-disable-next-line react/no-multi-comp */
