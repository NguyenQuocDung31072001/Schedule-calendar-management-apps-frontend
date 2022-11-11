import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import FormCourses from "../../../components/schedule/form/FormCourses";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  p: 4,
};

export default function CreateCourses({
  type,
  openModal,
  setOpenModal,
  getAllCourses,
  rowsSelected,
}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
      >
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {type === "create" ? "Add New Courses" : "Update Course"}
          </Typography>
          <FormCourses
            type={type}
            setOpenModal={setOpenModal}
            getAllCourses={getAllCourses}
            rowsSelected={rowsSelected}
          />
        </Box>
      </Modal>
    </div>
  );
}
