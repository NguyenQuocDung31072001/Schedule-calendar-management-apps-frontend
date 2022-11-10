import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { forgotPasswordMutationApi } from "../../../service/auth_api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export default function EnterEmail({ setActiveStep, setEmail }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });
  const { mutateAsync: sendEmailMutateAsync, isLoading: isLoadingSendEmail } =
    useMutation(forgotPasswordMutationApi, {
      onSuccess: () => {
        console.log("forgotPasswordMutationApi success");
      },
    });
  const handleSendEmail = ({ email }) => {
    setEmail(email);
    sendEmailMutateAsync(email).then((data) => {
      data && setActiveStep(1);
    });
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
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter email address"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            )}
          />
          {errors.email?.message && (
            <Typography sx={{ color: "red", marginLeft: "10px" }}>
              Email wrong format!
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItem: "center",
              marginTop: "10px",
            }}
          >
            <LoadingButton
              loading={isLoadingSendEmail}
              variant="contained"
              sx={{ width: 200 }}
              onClick={handleSubmit(handleSendEmail)}
            >
              Send email
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
