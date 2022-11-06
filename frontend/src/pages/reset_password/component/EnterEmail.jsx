import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

export default function EnterEmail() {
  const [email, setEmail] = React.useState("");
  const handleSendCode = () => {
    //send code
  };
  return (
    <Box>
      <Typography variant="h4">Reset Password</Typography>
      <Typography variant="h4">
        Enter the email associate with your account and we'll send an code to
        reset your password
      </Typography>
      <Box>
        <Typography>Email address</Typography>
        <TextField
          variant="outline"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSendCode}>Send code</Button>
      </Box>
    </Box>
  );
}
