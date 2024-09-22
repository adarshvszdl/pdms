import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import "./cameraModal.css";

export const CameraModal = ({ isOpen, onClose, sendDataToParent, startProcessing }) => {
  const webcamRef = useRef();
  const previewRef = useRef();
  const [message, setFacenetMessage] = useState("Place the face in the oval.");
  const [outline, setOutline] = useState("#f00000");
  let intervalId, screenShot, faces;

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [isOpen]);

  const takeScreenshot = () => {
    screenShot = webcamRef.current.getScreenshot();
    const previewImage = previewRef.current;
    previewImage.src = screenShot;
    onClose();
    setTimeout(() => {
      handleScreenshot(previewImage);
    }, 100);
  };

  const handleScreenshot = async (previewImage) => {
    startProcessing();
    await faceapi.nets.ssdMobilenetv1.loadFromUri("/facenet/models/ssd_mobilenetv1");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/facenet/models/face_landmark_68");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/facenet/models/face_recognition");
    faces = await faceapi.detectAllFaces(previewImage).withFaceLandmarks().withFaceDescriptors();
    sendDataToParent(screenShot, faces);
  };

  const handleStreamVideo = async (e) => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/facenet/models/tiny_face_detector");
    let counter = 0;
    intervalId = setInterval(async () => {
      if (counter <= 40) {
        const faces = await faceapi.detectAllFaces(
          webcamRef.current.video,
          new faceapi.TinyFaceDetectorOptions()
        );
        if (faces.length === 1 && faces[0].score > 0.5) {
          counter++;
          setOutline("#00ff00");
          setFacenetMessage("Stand still for " + Math.round(4 - counter / 10) + " seconds.");
        } else {
          counter = 0;
          setOutline("#f00000");
          setFacenetMessage("Place the face in the oval");
        }
      } else {
        clearInterval(intervalId);
        takeScreenshot();
      }
    }, 100);
  };

  if (!isOpen) return null;
  return (
    <div className="modalBackground">
      <div className="modal">
        <span className="modalClose" onClick={onClose}>
          &times;
        </span>
        <div className="camera-and-overlay-holder">
          <img id="preview" ref={previewRef} src={screenShot} style={{ display: "none" }} />
          <Webcam
            id="webcam"
            className="camera-video"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            mirrored={true}
            width={570}
            height={700}
            videoConstraints={{ facingMode: "user" }}
            onUserMedia={(e) => handleStreamVideo(e)}
          ></Webcam>
          <div className="camera-face-overlay" style={{ borderColor: outline }}>
            <div className="camera-face-message">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

CameraModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  sendDataToParent: PropTypes.func.isRequired,
  startProcessing: PropTypes.func.isRequired,
};
