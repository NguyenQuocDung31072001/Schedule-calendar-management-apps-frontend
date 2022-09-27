import React from "react";
import SideBar from "../components/SideBar";
import Schedule from "../components/Schedule";
import { Box, Grid, styled, Paper } from "@mui/material";
import NavBar from "../components/NavBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const HomePages = () => {
  return (
    <div>
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Item>
              <SideBar />
            </Item>
          </Grid>
          <Grid item xs={10}>
            <Item>
              <Schedule />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomePages;
