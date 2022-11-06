import React from "react";

//package
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

//material
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";

//material icon
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//util
import { parseNumberToTime } from "../../util/parseNumberToTime";

//service
import { getAllScheduleQuery } from "../../service/schedule_api";

//component
import CreateSchedule from "./component/CreateCourse";
import DialogConfirmDeleteSchedule from "./component/DialogConfirmDelete";

export default function ManageSchedule() {
  const currentUser = useSelector((state) => state.account);
  const [openModal, setOpenModal] = React.useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);

  const { data, isLoading } = useQuery(
    ["test"],
    () => getAllScheduleQuery({ token: currentUser.token }),
    {
      retry: 1,
    }
  );

  const rows = React.useMemo(() => {
    const dataSchedule = data?.data?.data;
    if (!dataSchedule) return [];
    return dataSchedule.map((item) => ({
      id: item.id,
      title: item.title,
      code: item.code,
      description: item.description,
      time:
        parseNumberToTime(item.startTime) +
        " - " +
        parseNumberToTime(item.endTime),
      numOfLessonsPerDay: item.numOfLessonsPerDay,
      startDate: item.startDate.split("T")[0],
      endDate: item.endDate.split("T")[0],
      numOfLessons: item.numOfLessons,
      colorCode: item.colorCode,
    }));
  }, [data]);

  const columns = React.useMemo(() => {
    return [
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
    /* eslint-disable-next-line react/no-multi-comp */
  }, [rows]);

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
          loading={isLoading}
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
