import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { registerApi } from "../service/auth_api"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().test(val => val.length >= 6)
});

export default function RegisterPages() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: yupResolver(schema)
  })
  // const methods = useForm();

  const navigate = useNavigate();
  //function
  const registerSubmit = (formData) => {
    registerApi({
      email: formData.email,
      password: formData.password,
      navigate
    })
  }

  return (
    <Box sx={{ position: 'fixed', width: "100vw", height: "100%", backgroundColor: "#1e90ff" }}>
      <Box sx={{
        position: "fixed", left: "50%", top: "50%", transform: 'translate(-50%,-50%)',
        backgroundColor: "white", padding: "20px 40px", borderRadius: "10px"
      }}>
        {/* <FormProvider {...methods}> */}
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant='h4'>Register Schedule</Typography>
        </Box>
        <Box sx={{ padding: "5px 0px" }}>
          <Typography sx={{ padding: "10px 0px" }}>Email address</Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <TextField
              {...field}
              sx={{ width: "350px" }}
              variant="outlined"
              label="Enter email"
            />}
          />
          {errors.email?.message && <Typography sx={{ color: 'red', marginLeft: '10px' }}>
            Email wrong format!
          </Typography>}
        </Box>
        <Box sx={{ padding: "10px 0px" }}>
          <Typography sx={{ padding: "10px 0px" }}>Password</Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <TextField
              {...field}
              variant="outlined"
              label="Enter password"
              type="password"
              sx={{ width: "350px" }}
            />}
          />
          {errors.password?.message && <Typography sx={{ color: 'red', marginLeft: '10px' }}>
            Password has at least 6 characters!
          </Typography>}

        </Box>
        <Box sx={{ width: "100%", padding: "10px 0px" }}>
          <Button
            sx={{ width: "100%" }} variant="contained"
            onClick={handleSubmit(registerSubmit)}>
            Register
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}
        >
          <Typography
            onClick={() => {
              navigate('/login')
            }}
          >
            Redirect to Login
          </Typography>
        </Box>
        {/* </FormProvider> */}
      </Box>
    </Box>
  )
}
