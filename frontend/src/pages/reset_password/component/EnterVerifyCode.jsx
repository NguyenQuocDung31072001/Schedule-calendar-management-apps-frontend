import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ReactInputVerificationCode from "react-input-verification-code";

export default function EnterVerifyCode({ setActiveStep }) {
  const [code, setCode] = React.useState();
  const verifyCode = () => {
    setActiveStep(2);
  };
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Reset Password
      </Typography>
      <Typography variant="P">
        Please enter the verification code we send to your email address
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
          <Box sx={{ marginBottom: 2 }}>
            <p>4-digit code</p>
          </Box>

          <ReactInputVerificationCode onChange={(e) => setCode(e)} />
        </Box>

        <Button variant="contained" sx={{ width: 200 }} onClick={verifyCode}>
          Verify
        </Button>
      </Box>
    </Box>
  );
}
