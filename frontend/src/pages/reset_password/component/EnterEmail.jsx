import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

export default function EnterEmail({ setActiveStep }) {
  const [email, setEmail] = React.useState("");
  const handleSendEmail = () => {
    //send code
    setActiveStep(1);
  };
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Reset Password
      </Typography>
      <Typography variant="P">
        Enter the email associate with your account and we'll send an code to
        reset your password
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "10px",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", marginBottom: "10px" }}>
          <Typography variant="p" sx={{}}>
            Email Address
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <Button
          variant="contained"
          sx={{ width: 200 }}
          onClick={handleSendEmail}
        >
          Send email
        </Button>
      </Box>
    </Box>
  );
}
