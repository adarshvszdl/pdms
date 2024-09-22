/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import ArgonBox from "components/ArgonBox";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

import { Stack } from "@mui/material";
import { useState } from "react";

import { useArgonController } from "context";
import { ToastContainer, toast } from "react-toastify";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { useParams } from "react-router-dom";
import { updatePatient } from "services/hospital/updatePatient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function AddPatientReportModal(props) {
  const [dateOfVisit, setDateOfVisit] = useState(dayjs().format("DD/MM/YYYY").toString());
  const [causeOfVisit, setCauseOfVisit] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [doctor, setDoctor] = useState("");
  const [medication, setMedication] = useState("");

  const [controller] = useArgonController();
  const { auth } = controller;

  const { id } = useParams();

  const handleClose = () => props.setOpen(false);

  const handleSubmit = async () => {
    const data = {
      dateOfVisit,
      causeOfVisit,
      condition,
      description,
      doctor,
      medication,
    };

    const response = await updatePatient(data, id);
    if (response.status === "success") {
      toast(response.message);
      props.setOpen(false);
    } else {
      toast(response.message);
    }
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Patient Report
          </Typography>
          <ArgonBox component="form" role="form" sx={{ mt: 2 }}>
            <ArgonBox mb={2}>
              <ArgonInput
                type="text"
                placeholder="Cause Of Visit"
                size="large"
                onChange={(event) => {
                  setCauseOfVisit(event.target.value);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <Typography
                sx={{
                  textAlign: "left",
                  paddingLeft: 0,
                  fontSize: ".8rem",
                }}
              >
                &nbsp;Date of Visit
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DesktopDatePicker
                    defaultValue={dayjs()}
                    sx={{
                      width: "100%",
                      "& .MuiInputBase-root": {
                        display: "flex",
                        justifyContent: "space-between",
                        paddingLeft: 0,
                        paddingTop: 1.5,
                        paddingBottom: 1.5,
                      },
                    }}
                    onChange={(dob) => {
                      setDateOfVisit(dob.format("DD/MM/YYYY").toString());
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="text"
                placeholder="Condition"
                size="large"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="text"
                placeholder="Description"
                size="large"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="text"
                placeholder="Doctor"
                size="large"
                onChange={(event) => {
                  setDoctor(event.target.value);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="text"
                placeholder="Medication"
                size="large"
                onChange={(event) => {
                  setMedication(event.target.value);
                }}
              />
            </ArgonBox>

            <Stack mt={4} mb={1} direction={"row"} gap={2}>
              <ArgonButton color="secondary" size="medium" onClick={handleClose} fullWidth>
                Cancel
              </ArgonButton>
              <ArgonButton color="dark" size="medium" onClick={handleSubmit} fullWidth>
                Add report
              </ArgonButton>
            </Stack>
            <ArgonBox mt={3} textAlign="center"></ArgonBox>
          </ArgonBox>
        </Box>
      </Modal>
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
    </div>
  );
}
