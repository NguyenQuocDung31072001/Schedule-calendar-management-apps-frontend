import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPages() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const navigate = useNavigate();
  return (
    <Box sx={{ width: "100vw", height: "98vh", backgroundColor: "#1e90ff" }}>
      <Box sx={{
        position: "fixed", left: "50%", top: "50%", transform: 'translate(-50%,-50%)',
        backgroundColor: "white", padding: "20px 40px", borderRadius: "10px"
      }}>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant='h4'>Register Schedule</Typography>
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
        <Box sx={{ width: "100%", padding: "10px 0px" }}>
          <Button sx={{ width: "100%" }} variant="contained">Register</Button>
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
      </Box>
    </Box>
  )
}
