import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function SettingPages() {
  return (
    <div className=" flex flex-col item-center justify-center">
      <Box
        sx={{
          width: "100%",
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          marginBottom: "30px",
        }}
      >
        <Typography variant="p" sx={{ fontSize: "30px", fontWeight: "bold" }}>
          Profile
        </Typography>
        <Typography variant="p">Here you can manage your account.</Typography>
      </Box>
      <div className="flex flex-col w-[500px] m-auto">
        <Box sx={{ display: "flex" }}>
          <img
            src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=170667a&w=0&k=20&c=MRMqc79PuLmQfxJ99fTfGqHL07EDHqHLWg0Tb4rPXQc="
            alt="profile avatar"
            className="w-[50px] h-[50px] object-cover rounded-[50%]"
          />
          <Button size="small">Upload</Button>
          <Button size="small">Delete</Button>
        </Box>
        <div>
          <Grid>
            <Box className="flex items-center">
              <Grid item xs={4}>
                <span>Email</span>
              </Grid>
              <Grid item xs={8}>
                <TextField size="small" placeholder="Enter your email" />
              </Grid>
            </Box>
          </Grid>
        </div>
        {/* <div className="w-[100px] h-[20px]"></div> */}

        <div className="">
          <Grid>
            <Box className="flex items-center">
              <Grid item xs={4}>
                <span>Username</span>
              </Grid>
              <Grid item xs={8}>
                <TextField size="small" placeholder="Enter your username" />
              </Grid>
            </Box>
          </Grid>
        </div>
      </div>
    </div>
  );
}
