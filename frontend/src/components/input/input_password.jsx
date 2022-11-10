import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export default function InputPassword({ id, filed }) {
  const [isShowPass, setIsShowPass] = React.useState(true);
  return (
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel htmlFor={id}>Enter password</InputLabel>
      <OutlinedInput
        {...filed}
        id={id}
        sx={{ width: "350px" }}
        type={isShowPass ? "password" : "text"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setIsShowPass(!isShowPass)}
              edge="end"
            >
              {isShowPass ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Enter password"
      />
    </FormControl>
  );
}
