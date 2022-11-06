import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthWrapper() {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100%",
        backgroundColor: "#ecf0f1",
      }}
    >
      <Outlet />
    </Box>
  );
}
