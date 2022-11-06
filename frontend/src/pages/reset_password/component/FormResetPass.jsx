import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
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

export default function FormResetPass() {
  const { control, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Box>
      <Box>
        <Typography variant="h4">Create new password</Typography>
        <Typography variant="p">
          Your new password must be different from previous used password
        </Typography>
      </Box>
      <Box sx={{ padding: "10px 0px" }}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            return <InputPassword id="password_login" filed={field} />;
          }}
        />
        {errors.password?.message && (
          <Typography sx={{ color: "red", marginLeft: "10px" }}>
            Password has at least 6 characters!
          </Typography>
        )}
      </Box>
      <Box sx={{ padding: "10px 0px" }}>
        <Controller
          name="confirmPwd"
          control={control}
          render={({ field }) => {
            return <InputPassword id="passwordPwd_login" filed={field} />;
          }}
        />
        {errors.confirmPwd?.message && (
          <Typography sx={{ color: "red", marginLeft: "10px" }}>
            Password has at least 6 characters!
          </Typography>
        )}
      </Box>
      <Box>
        <Button>Reset Password</Button>
      </Box>
    </Box>
  );
}
