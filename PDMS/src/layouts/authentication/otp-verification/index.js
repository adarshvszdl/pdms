import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import { ToastContainer, toast } from "react-toastify";

// Authentication layout components
import OtpRegistrationLayout from "layouts/authentication/components/OtpRegistrationLayout";

import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import VerificationInput from "react-verification-input";
import { Box, Link, Typography } from "@mui/material";
import { verifyOTPService } from "../../../services/common/verifyOTP";
import "./otpVerification.css";

OtpVerification.propTypes = {
  role: PropTypes.string,
  title: PropTypes.string,
};

function OtpVerification() {
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState();
  const [seconds, setSeconds] = useState(2);
  const [resendingOtp, setResendingOtp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [seconds]);

  useEffect(() => {
    console.log(otp);
  }, [otp]);

  const handleSubmit = async () => {
    try {
      const response = await verifyOTPService({
        otp,
      });
      console.log(response);
      toast(response.message);
      setTimeout(() => {
        navigate("/face-verification");
      }, 3000);
    } catch (error) {
      toast(error.message);
    }
  };

  const handleResendOtp = async () => {
    // TODO: call resend otp
    setResendingOtp(true);

    const intervalId = setInterval(() => {
      toast("otp sent successfully");
      setResendingOtp(false);
      setSeconds(3);
      clearInterval(intervalId);
    }, 3000);
  };

  return (
    <>
      <OtpRegistrationLayout
        title={`Otp Verification`}
        description="Enter the otp sent to your mobile number ********18"
      >
        <Box sx={{ my: 4 }}></Box>
        <ArgonBox component="form" role="form">
          <Box
            mb={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              mb: 6,
            }}
          >
            <VerificationInput
              validChars="0-9"
              inputProps={{ inputMode: "numeric" }}
              onChange={setOtp}
              classNames={{
                character: "character",
              }}
              passwordMode={true}
            />
          </Box>
          {seconds > 0 ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography
                fontFamily={'"Open Sans","Helvetica","Arial",sans-serif'}
                sx={{
                  color: "#67748e",
                  fontSize: "1rem",
                }}
              >
                Resend OTP in {seconds}s
              </Typography>
            </Box>
          ) : resendingOtp ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Typography onClick={handleResendOtp}>
                <Typography
                  fontFamily={'"Open Sans","Helvetica","Arial",sans-serif'}
                  sx={{
                    color: "#5e72e4",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Resend OTP
                </Typography>
              </Typography>
            </Box>
          )}
          <ArgonBox mt={4} mb={1}>
            <ArgonButton
              color="primary"
              size="large"
              fullWidth
              disabled={!otp || otp.length !== 6}
              onClick={() => {
                handleSubmit();
              }}
            >
              Continue
            </ArgonButton>
          </ArgonBox>
        </ArgonBox>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </OtpRegistrationLayout>
    </>
  );
}

export default OtpVerification;
