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
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <TextField
            label="Enter email address"
            variant="outlined"
            sx={{ width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              marginTop: "10px",
            }}
          >
            <Button
              variant="contained"
              sx={{ width: 200 }}
              onClick={handleSendEmail}
            >
              Send email
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
