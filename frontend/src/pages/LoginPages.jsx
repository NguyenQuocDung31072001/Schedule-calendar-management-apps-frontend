import { Box, Button, Checkbox, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPages() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const navigate = useNavigate()
  return (
    <Box sx={{ width: "100vw", height: "98vh", backgroundColor: "#1e90ff" }}>
      <Box sx={{
        position: "fixed", left: "50%", top: "50%", transform: 'translate(-50%,-50%)',
        backgroundColor: "white", padding: "20px 40px", borderRadius: "10px"
      }}>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant='h4'>Sign in</Typography>
        </Box>
        <Box sx={{ padding: "5px 0px" }}>
          <Typography sx={{ padding: "10px 0px" }}>Email address</Typography>
          <TextField
            sx={{ width: "350px" }}
            variant="outlined"
            label="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ padding: "10px 0px" }}>
          <Typography sx={{ padding: "10px 0px" }}>Password</Typography>
          <TextField
            variant="outlined"
            label="Enter password"
            type="password"
            sx={{ width: "350px" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox />
          <Typography>Remember me</Typography>
        </Box>
        <Box sx={{ width: "100%", padding: "10px 0px" }}>
          <Button sx={{ width: "100%" }} variant="contained"
            onClick={() => {
              navigate('/schedule')
            }}
          >Submit</Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography onClick={() => {
            navigate('/register')
          }}>Register</Typography>
          <Typography>Forgot password</Typography>
        </Box>
      </Box>
    </Box>
  )
}
