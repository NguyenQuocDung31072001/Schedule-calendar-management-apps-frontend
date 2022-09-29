import React from "react";

import { Box } from "@mui/material";
//component
import SidebarComponent from "../components/layout/SidebarComponent";
// import TopBar from "../components/layout/TopBarComponent";
import Schedule from "../components/Schedule";
export default function LayoutPages() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <SidebarComponent>
        <Schedule />
      </SidebarComponent>
    </Box>
  );
}
