import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";
import { ToastContainer, toast } from "react-toastify";

// Authentication layout components
import FaceIllustrationLayout from "layouts/authentication/components/FaceIllustrationLayout";
import { registerFaceService } from "services/common/registerFace";

import { useNavigate } from "react-router-dom";
import { CameraModal } from "./cameraModal/cameraModal";
import CircularProgress from "@mui/material/CircularProgress";

FaceRegistration.propTypes = {
  role: PropTypes.string,
  title: PropTypes.string,
};

function FaceRegistration() {
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [faces, setFaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setId(urlParams.get("id"));
    setRole(urlParams.get("role"));
    setEmail(urlParams.get("email"));
  }, []);

  const handleCameraData = (screenshot, faces) => {
    setScreenshot(screenshot);
    setFaces(faces);
    setIsLoading(false);
    toast("Face added");
  };

  const handleSubmit = async () => {
    if (!email || !id || !role) {
      toast("Invalid URL");
    } else {
      try {
        const response = await registerFaceService({
          id,
          email,
          role,
          descriptor: Object.values(faces[0].descriptor),
          screenshot,
        });
        toast(response.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        toast(error.message);
      }
    }
  };

  return (
    <>
      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        sendDataToParent={handleCameraData}
        startProcessing={() => {
          setIsLoading(true);
        }}
      />
      <FaceIllustrationLayout title={`Face Registration`} description="Register your face">
        <ArgonBox component="form" role="form">
          <ArgonBox mb={2}>
            <ArgonInput type="email" placeholder="Email" size="large" value={email} disabled />
          </ArgonBox>
          <ArgonBox mb={2} style={{ position: "relative" }}>
            <ArgonButton
              color="info"
              size="large"
              fullWidth
              disabled={isLoading}
              onClick={() => setIsCameraModalOpen(true)}
            >
              Add Face
            </ArgonButton>
            {isLoading && (
              <CircularProgress size={42} style={{ position: "absolute", right: -55 }} />
            )}
          </ArgonBox>
          <ArgonBox mt={4} mb={1}>
            <ArgonButton
              color="info"
              size="large"
              fullWidth
              disabled={faces[0] == null}
              onClick={() => {
                handleSubmit();
              }}
            >
              Continue
            </ArgonButton>
          </ArgonBox>
          <ArgonBox mt={3} textAlign="center"></ArgonBox>
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
      </FaceIllustrationLayout>
    </>
  );
}

export default FaceRegistration;
