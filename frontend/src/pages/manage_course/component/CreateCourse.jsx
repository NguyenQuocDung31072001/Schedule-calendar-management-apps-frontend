import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

/*
  "title": "string",
  "code": "string",
  "description": "string",
  "startTime": 86400,
  "endTime": 86400,
  "dayOfWeeks": [
    "Sunday"
  ],
  "numOfLessonsPerDay": 0,
  "startDate": "2022-11-10T11:07:36.393Z",
  "endDate": "2022-11-10T11:07:36.393Z",
  "numOfLessons": 0,
  "notiBeforeTime": 0,
  "colorCode": "string"
*/
export default function CreateCourses({ openModal, setOpenModal }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {},
  });
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Box id="transition-modal-description">
              <Controller
                name="title"
                control={control}
                render={({ filed }) => <TextField variant="outline" />}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
