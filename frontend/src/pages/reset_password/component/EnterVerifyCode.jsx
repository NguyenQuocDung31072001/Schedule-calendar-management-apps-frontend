import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import ReactInputVerificationCode from "react-input-verification-code";
import { verifyCodeRePasswordMutationApi } from "../../../service/auth_api";
export default function EnterVerifyCode({ setActiveStep, email }) {
  const [code, setCode] = React.useState();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      code: "",
    },
  });
  const { mutateAsync: verifyCodeMutation, isLoading: isLoadingVerify } =
    useMutation(verifyCodeRePasswordMutationApi);

  const handleVerifyCode = () => {
    verifyCodeMutation({
      email: email,
      code: code,
    }).then((data) => {
      data && setActiveStep(2);
    });
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

        <LoadingButton
          disabled={!Number.isInteger(Number(code))}
          loading={isLoadingVerify}
          variant="contained"
          sx={{ width: 200 }}
          onClick={handleVerifyCode}
        >
          Verify
        </LoadingButton>
      </Box>
    </Box>
  );
}
