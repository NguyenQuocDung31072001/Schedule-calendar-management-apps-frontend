import { Box, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactInputVerificationCode from "react-input-verification-code";
import { verifyAccountMutationApi } from "../service/auth_api";
import { useMutation } from "@tanstack/react-query";
import { pathName } from "../config/pathName";

export default function VerifyAccountPages() {
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = React.useState();

  const {
    data,
    isLoading,
    mutateAsync: verifyAccount,
  } = useMutation(verifyAccountMutationApi, {
    onSuccess: () => {
      console.log("verify success");
    },
  });
  React.useEffect(() => {
    if (data) {
      navigate(`${pathName.auth.login}`);
    }
  }, [data]);

  React.useEffect(() => {
    if (Number.isInteger(Number(code))) {
      console.log({ code });
      verifyAccount({
        email: location.state.email,
        code: code,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);
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
        <Typography variant="h4">Verify your account</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="p">
          Enter a code shown in the app to make sure everything works fine
        </Typography>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ marginBottom: 1 }} variant="p">
            4-digit code
          </Typography>
          <ReactInputVerificationCode onChange={(e) => setCode(e)} />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Typography>
          <Link
            to={pathName.auth.register}
            style={{
              textDecoration: "none",
              fontFamily: "Arial, Helvetica, sans-serif",
              color: "blue",
            }}
          >
            Back to register
          </Link>
        </Typography>
        <Typography>Reset code</Typography>
      </Box>
    </Box>
  );
}
