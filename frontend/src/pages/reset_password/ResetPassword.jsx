import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
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
  const [activeStep, setActiveStep] = React.useState(0);
  console.log({ activeStep });
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
        {activeStep === 0 && <EnterEmail setActiveStep={setActiveStep} />}
        {activeStep === 1 && <EnterVerifyCode setActiveStep={setActiveStep} />}
        {activeStep === 2 && <FormResetPass />}
      </Box>
    </Box>
  );
}
