import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export default function InputPassword({ id, filed, label }) {
  const [isShowPass, setIsShowPass] = React.useState(true);
  return (
    <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
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
        label={label}
      />
    </FormControl>
  );
}
