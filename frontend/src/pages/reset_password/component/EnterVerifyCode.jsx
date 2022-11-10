import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import ReactInputVerificationCode from "react-input-verification-code";

export default function EnterVerifyCode() {
  const [code, setCode] = React.useState();

  return (
    <Box>
      <Typography variant="h4">Reset Password</Typography>
      <Typography variant="h4">
        Please enter the verification code we send to your email address
      </Typography>
      <Box>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginBottom: 1 }} variant="p">
            4-digit code
          </Typography>
          <ReactInputVerificationCode onChange={(e) => setCode(e)} />
        </Box>

        <Button>Verify</Button>
      </Box>
    </Box>
  );
}
