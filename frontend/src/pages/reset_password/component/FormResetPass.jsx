import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import InputPassword from "../../../components/input/input_password";
import * as yup from "yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is mendatory")
    .min(6, "Password must be at 6 char long"),
  confirmPwd: yup
    .string()
    .required("Password is mendatory")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

export default function FormResetPass({ setActiveStep }) {
  const { control, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const handleResetPassword = () => {
    setActiveStep(3);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Create new password
      </Typography>
      <Typography variant="p">
        Your new password must be different from previous used password
      </Typography>
      <Box sx={{ padding: "10px 0px" }}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            return (
              <InputPassword
                id="password_reset"
                filed={field}
                label="Password"
              />
            );
          }}
        />
        {errors?.password?.message && (
          <Typography sx={{ color: "red", marginLeft: "10px" }}>
            Password has at least 6 characters!
          </Typography>
        )}
      </Box>
      <Box sx={{}}>
        <Controller
          name="confirmPwd"
          control={control}
          render={({ field }) => {
            return (
              <InputPassword
                id="passwordPwd_reset"
                filed={field}
                label="Confirm Password"
              />
            );
          }}
        />
        {errors?.confirmPwd?.message && (
          <Typography sx={{ color: "red", marginLeft: "10px" }}>
            Password has at least 6 characters!
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
        }}
      >
        <Button variant="contained" onClick={handleResetPassword}>
          Reset Password
        </Button>
      </Box>
    </Box>
  );
}
