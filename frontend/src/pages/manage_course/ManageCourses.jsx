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
import { parseNumberToTime } from "../../util/time/parseNumberToTime";

//service
import { getAllCoursesQuery } from "../../service/schedule_api";

//component
import CreateCourses from "./component/CreateCourse";
import DeleteCourses from "./component/DialogConfirmDelete";

export default function ManageSchedule() {
  const currentUser = useSelector((state) => state.account);
  const [openModal, setOpenModal] = React.useState(false);
  const [rowsSelected, setRowsSelected] = React.useState([]);
  const [openDialogConfirm, setOpenDialogConfirm] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState("create");
  const {
    data,
    isLoading: isLoadingGetAllCourses,
    isFetching: isFetchingGetAllCourses,
    refetch: getAllCourses,
  } = useQuery(
    ["test"],
    () => getAllCoursesQuery({ token: currentUser.token }),
    {
      retry: 0,
      enabled: false,
    }
  );

  //useEffect
  React.useEffect(() => {
    getAllCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //useMemo
  const rows = React.useMemo(() => {
    const dataSchedule = data?.data?.data;
    if (!dataSchedule) return [];
    return dataSchedule.map((item) => {
      console.log({ test: item.startTime });
      return {
        id: item.id,
        title: item.title,
        code: item.code,
        description: item.description,
        startTime: item.startTime,
        endTime: item.endTime,
        time:
          parseNumberToTime(item.startTime) +
          " - " +
          parseNumberToTime(item.endTime),
        numOfLessonsPerDay: item.numOfLessonsPerDay,
        dayOfWeeks: item.dayOfWeeks,
        startDate: item.startDate.split("T")[0],
        endDate: item.endDate.split("T")[0],
        numOfLessons: item.numOfLessons,
        colorCode: item.colorCode,
      };
    });
  }, [data]);

  const columns = React.useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 70 },
      { field: "title", headerName: "Title", width: 150 },
      { field: "code", headerName: "Code", width: 130 },
      { field: "description", headerName: "Description", width: 250 },
      {
        field: "time",
        headerName: "time",
        width: 130,
        renderCell: (record) => {},
      },
      {
        field: "numOfLessonsPerDay",
        headerName: "NumOfLessonsPerDay",
        width: 130,
      },
      {
        field: "dayOfWeeks",
        headerName: "DayOfWeeks",
        width: 130,
        renderCell: (record) => {
          // console.log({ record });
        },
      },
      { field: "startDate", headerName: "StartDate", width: 130 },
      { field: "endDate", headerName: "endDate", width: 130 },
      { field: "numOfLessons", headerName: "numOfLessons", width: 130 },
      { field: "colorCode", headerName: "colorCode", width: 130 },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Box>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            startIcon={<AddCircleIcon />}
            variant="outlined"
            onClick={() => {
              setOpenModal(true);
              setTypeModal("create");
            }}
          >
            Add
          </LoadingButton>
          <LoadingButton
            disabled={rowsSelected.length === 0 || rowsSelected.length > 1}
            loading={false}
            loadingPosition="start"
            startIcon={<AddCircleIcon />}
            sx={{ marginLeft: 2 }}
            variant="outlined"
            onClick={() => {
              setOpenModal(true);
              setTypeModal("update");
            }}
          >
            Update
          </LoadingButton>
          <LoadingButton
            disabled={rowsSelected.length === 0}
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
      <CreateCourses
        type={typeModal}
        openModal={openModal}
        setOpenModal={setOpenModal}
        getAllCourses={getAllCourses}
        rowsSelected={rowsSelected}
      />
      <DeleteCourses
        openDialog={openDialogConfirm}
        setOpenDialog={setOpenDialogConfirm}
        rowsSelected={rowsSelected}
        getAllCourses={getAllCourses}
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          loading={isLoadingGetAllCourses || isFetchingGetAllCourses}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onSelectionModelChange={(ids) => {
            const selectedRowData = rows.filter((row) => ids.includes(row.id));
            setRowsSelected(selectedRowData);
          }}
        />
      </div>
    </Box>
  );
}
