// @mui material components
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";

import { useNavigate } from "react-router-dom";

// Custom styles for the Configurator
import ConfiguratorRoot from "layouts/authentication/components/Configurator/ConfiguratorRoot";

// Argon Dashboard 2 MUI context
import { useArgonController, setOpenConfigurator } from "context";

function Configurator() {
  const [controller, dispatch] = useArgonController();
  const { openConfigurator, darkMode } = controller;

  const navigate = useNavigate();

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <ArgonBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <ArgonBox>
          <ArgonTypography variant="h5">Switch Roles</ArgonTypography>
        </ArgonBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark, white } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: darkMode ? white.main : dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </ArgonBox>

      <Divider />

      <ArgonBox pt={1.25} pb={3} px={3}>
        <ArgonBox mt={5} mb={2}>
          <ArgonBox mb={2}>
            <ArgonButton
              onClick={() => {navigate("/authentication/patient/sign-in");}}
              color="info"
              fullWidth
            >
              Patient Sign In
            </ArgonButton>
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonButton
              onClick={() => {navigate("/authentication/doctor/sign-in");}}
              color="primary"
              fullWidth
            >
              Doctor Sign In
            </ArgonButton>
          </ArgonBox>
          <ArgonBox mb={2}>
            <ArgonButton
              onClick={() => {navigate("/authentication/insurance/sign-in");}}
              color="warning"
              fullWidth
            >
              Insurance Sign In
            </ArgonButton>
          </ArgonBox>
          <ArgonButton
            onClick={() => {navigate("/authentication/admin/sign-in");}}
            color="dark"
            fullWidth
          >
            Admin Sign in
          </ArgonButton>
        </ArgonBox>
      </ArgonBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
