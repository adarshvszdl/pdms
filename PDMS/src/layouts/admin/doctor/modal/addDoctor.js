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
import { adminAddDoctor } from "services/admin/addDoctor";
import { ToastContainer, toast } from "react-toastify";

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

export default function AddHospitalModal(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [controller] = useArgonController();

  const handleClose = () => props.setOpen(false);

  const handleSubmit = async () => {
    const data = {
      name: name,
      email: email,
      password: password,
      address: address,
      state: state,
      phone: phone,
    };
    const response = await adminAddDoctor(data);

    if (response.success == true) {
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
            Add New Doctor
          </Typography>
          <ArgonBox component="form" role="form" sx={{ mt: 2 }}>
            <ArgonBox mb={2}>
              <ArgonInput
                type="text"
                placeholder="Name"
                size="large"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="email"
                placeholder="Email"
                size="large"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="password"
                placeholder="Password"
                size="large"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="text"
                placeholder="Address"
                size="large"
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="text"
                placeholder="State"
                size="large"
                onChange={(event) => {
                  setState(event.target.value);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput
                type="tel"
                placeholder="Phone"
                size="large"
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </ArgonBox>
            <ArgonBox mb={2}>
              {/* <ArgonInput
                type="select"
                placeholder="Wallet"
                size="large"
                onChange={(event) => {
                  setWallet(event.target.value);
                }}
              />
               */}
            </ArgonBox>
            <Stack mt={4} mb={1} direction={"row"} gap={2}>
              <ArgonButton color="secondary" size="medium" onClick={handleClose} fullWidth>
                Cancel
              </ArgonButton>
              <ArgonButton color="dark" size="medium" onClick={handleSubmit} fullWidth>
                Create Doctor
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
