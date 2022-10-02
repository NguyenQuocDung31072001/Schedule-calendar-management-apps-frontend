import React from "react";

//matetial component
import { Box } from "@mui/material";

//component
import Schedule from "../components/schedule/Schedule";

export default function SchedulePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Schedule />
    </Box>
  );
}
