import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation } from "@tanstack/react-query";
import { deleteCoursesMutation } from "../../../service/schedule_api";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";

export default function DeleteCourses({
  openDialog,
  setOpenDialog,
  rowsSelected,
  getAllCourses,
}) {
  const currentUser = useSelector((state) => state.account);
  const { mutateAsync: deleteCourses, isLoading: isLoadingDelete } =
    useMutation(deleteCoursesMutation);
  const handleDeleteCourse = () => {
    const promise = rowsSelected.map((data) =>
      deleteCourses({ id: data.id, token: currentUser.token })
    );
    Promise.all(promise).then((result) => {
      setOpenDialog(false);
      getAllCourses();
    });
  };
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to delete course
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete course, course was deleted!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <LoadingButton
            loading={isLoadingDelete}
            onClick={handleDeleteCourse}
            autoFocus
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
