import { Box, Button } from "@mui/material";
import React from "react";

export default function AccountSetting() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex" }}>
        <img
          src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
          alt="profile avatar"
        />
        <Button> Upload new avatar</Button>
        <Button>Delete</Button>
      </Box>
    </Box>
  );
}
