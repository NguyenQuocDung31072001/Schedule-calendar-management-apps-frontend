import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerMutationApi } from "../service/auth_api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { LoadingButton } from "@mui/lab";
import { pathName } from "../config/pathName";
import InputPassword from "../components/input/input_password";

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .test((val) => val.length >= 6),
});

export default function RegisterPages() {
  const navigate = useNavigate();
  const [transformEmail, setTransformEmail] = React.useState();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const {
    data,
    isLoading,
    mutate: registerMutation,
  } = useMutation(registerMutationApi, {
    onSuccess: () => {
      console.log("login success");
    },
    onError: () => {
      console.log("login error");
    },
  });
  if (data) {
    navigate(`${pathName.auth.full_verify_account}`, {
      state: {
        email: transformEmail,
      },
    });
  }
  //function

  const registerSubmit = (formData) => {
    setTransformEmail(formData.email);
    registerMutation({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        backgroundColor: "white",
        padding: "20px 40px",
        borderRadius: "10px",
      }}
    >
      {/* <FormProvider {...methods}> */}
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h4">Register Schedule</Typography>
      </Box>
      <Box sx={{ padding: "5px 0px" }}>
        {/* <Typography sx={{ padding: "10px 0px" }}>Email address</Typography> */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "350px" }}
              variant="outlined"
              label="Enter email"
            />
          )}
        />
        {errors.email?.message && (
          <Typography sx={{ color: "red", marginLeft: "10px" }}>
            Email wrong format!
          </Typography>
        )}
      </Box>
      <Box sx={{ padding: "10px 0px" }}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputPassword
              id="password_register"
              filed={field}
              label="Enter password"
            />
          )}
        />
        {errors.password?.message && (
          <Typography sx={{ color: "red", marginLeft: "10px" }}>
            Password has at least 6 characters!
          </Typography>
        )}
      </Box>
      <Box sx={{ width: "100%", padding: "10px 0px" }}>
        <LoadingButton
          sx={{ width: "100%" }}
          variant="contained"
          onClick={handleSubmit(registerSubmit)}
          loading={isLoading}
        >
          Register
        </LoadingButton>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Link
          to={pathName.auth.full_login}
          style={{
            textDecoration: "none",
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "blue",
          }}
        >
          Redirect to Login
        </Link>
      </Box>
    </Box>
  );
}
