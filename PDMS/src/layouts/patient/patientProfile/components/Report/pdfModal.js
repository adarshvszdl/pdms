/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { Stack } from "@mui/material";

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

export default function PdfModal(props) {
  const handleClose = () => props.setOpen(false);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Medical Report
            </Typography>
            <IconButton aria-label="close" size="medium" onClick={handleClose} >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Stack>
          <ArgonBox mt={2}>
            <iframe
              style={{
                width: "100%",
                height: "80vh",
              }}
              src={props.blob}
              type="application/pdf"
              title="title"
              name="SS"
            />
          </ArgonBox>
        </Box>
      </Modal>
    </div>
  );
}
