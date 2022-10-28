import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { parseNumberToTime } from "../../util/parseNumberToTime";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateSchedule from "./component/CreateSchedule";
import DialogConfirmDeleteSchedule from "./component/DialogConfirmDelete";

export default function ManageSchedule() {
  const [openModal, setOpenModal] = React.useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "code", headerName: "Code", width: 130 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "time", headerName: "time", width: 130 },
    {
      field: "numOfLessonsPerDay",
      headerName: "NumOfLessonsPerDay",
      width: 130,
    },
    { field: "startDate", headerName: "StartDate", width: 130 },
    { field: "endDate", headerName: "endDate", width: 130 },
    { field: "numOfLessons", headerName: "numOfLessons", width: 130 },
    { field: "colorCode", headerName: "colorCode", width: 130 },
  ];
  const rows = [
    {
      id: 3,
      title: "Test courses 2",
      code: "#fff",
      description: "string",
      time: parseNumberToTime(36000) + " - " + parseNumberToTime(39600),
      numOfLessonsPerDay: 3,
      startDate: "2023-01-11T00:00:00",
      endDate: "2023-01-11T00:00:00",
      numOfLessons: "45",
      colorCode: "#fff",
    },
    {
      id: 4,
      title: "Test courses 2",
      code: "#fff",
      description: "string",
      time: parseNumberToTime(36000) + " - " + parseNumberToTime(39600),
      numOfLessonsPerDay: 3,
      startDate: "2023-01-11T00:00:00",
      endDate: "2023-01-11T00:00:00",
      numOfLessons: "45",
      colorCode: "#fff",
    },
  ];
  return (
    <Box sx={{ padding: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Typography variant="h4">Schedule</Typography>
        <Box sx={{}}>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<AddCircleIcon />}
            variant="outlined"
            onClick={() => setOpenModal(true)}
          >
            Add
          </LoadingButton>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<DeleteIcon />}
            variant="outlined"
            sx={{ marginLeft: 2 }}
            color="error"
            onClick={() => setOpenDialogConfirm(true)}
          >
            Delete
          </LoadingButton>
        </Box>
      </Box>
      <CreateSchedule openModal={openModal} setOpenModal={setOpenModal} />
      <DialogConfirmDeleteSchedule
        openDialog={openDialogConfirm}
        setOpenDialog={setOpenDialogConfirm}
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  );
}
