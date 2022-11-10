import { Box, Checkbox, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginMutationApi } from "../service/auth_api";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/account_slice";
import InputPassword from "../components/input/input_password";
import { pathName } from "../config/pathName";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .test((val) => val.length >= 6),
});
export default function LoginPages() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.account);
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
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    mutate: loginMutation,
  } = useMutation(loginMutationApi, {
    onSuccess: () => {
      console.log("login success");
    },
    onError: () => {
      console.log("login error");
    },
  });

  React.useEffect(() => {
    if (data) {
      dispatch(login(data.data));
    }
  }, [data, dispatch]);
  //function
  const loginSubmit = (formData) => {
    loginMutation({
      email: formData.email,
      password: formData.password,
    });
  };
  React.useEffect(() => {
    if (currentUser.token) {
      navigate(`${pathName.schedule}`);
    }
  }, [currentUser.token, navigate]);
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
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h4">Sign in</Typography>
      </Box>
      <Box sx={{ padding: "5px 0px" }}>
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
          render={({ field }) => {
            return (
              <InputPassword
                id="password_login"
                filed={field}
                label="Enter password"
              />
            );
          }}
        />
        {errors.password?.message && (
          <Typography sx={{ color: "red", marginLeft: "10px" }}>
            Password has at least 6 characters!
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox />
        <Typography>Remember me</Typography>
      </Box>
      <Box sx={{ width: "100%", padding: "10px 0px" }}>
        <LoadingButton
          sx={{ width: "100%" }}
          variant="contained"
          onClick={handleSubmit(loginSubmit)}
          loading={isLoading}
        >
          Submit
        </LoadingButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          textDecoration: "none",
        }}
      >
        <Link
          to={pathName.auth.full_register}
          replace={false}
          style={{
            textDecoration: "none",
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "blue",
          }}
        >
          Register
        </Link>
        <Link
          to={pathName.auth.full_reset_password}
          replace={false}
          style={{
            textDecoration: "none",
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "blue",
          }}
        >
          Forgot password{" "}
        </Link>
      </Box>
    </Box>
  );
}
