import { Box, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { pathName } from "../../config/pathName";
import EnterEmail from "./component/EnterEmail";
import EnterVerifyCode from "./component/EnterVerifyCode";
import FormResetPass from "./component/FormResetPass";

const titleSteps = {
  enterEmail: "Enter your email",
  verifyCode: "Verify code",
  createNewPass: "Create new password",
};
const steps = [
  titleSteps.enterEmail,
  titleSteps.verifyCode,
  titleSteps.createNewPass,
];

export default function ResetPassword() {
  const [email, setEmail] = React.useState("");
  const [token, setToken] = React.useState();
  const [activeStep, setActiveStep] = React.useState(0);
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
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === 0 && (
          <EnterEmail setActiveStep={setActiveStep} setEmail={setEmail} />
        )}
        {activeStep === 1 && (
          <EnterVerifyCode
            setActiveStep={setActiveStep}
            email={email}
            setToken={setToken}
          />
        )}
        {activeStep === 2 && (
          <FormResetPass setActiveStep={setActiveStep} token={token} />
        )}
        {activeStep === 3 && (
          <Link
            to={pathName.auth.full_login}
            style={{
              textDecoration: "none",
              fontFamily: "Arial, Helvetica, sans-serif",
              color: "blue",
            }}
          >
            Back to login
          </Link>
        )}
      </Box>
    </Box>
  );
}
