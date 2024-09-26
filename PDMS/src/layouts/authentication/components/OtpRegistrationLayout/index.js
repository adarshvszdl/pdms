// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import PageLayout from "examples/LayoutContainers/PageLayout";
import { Box } from "@mui/material";

function OtpRegistrationLayout({ color, header, title, description, illustration, children }) {
  return (
    <PageLayout background="white" >
      <Grid container>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <ArgonBox display="flex" flexDirection="column" justifyContent="center" height="100vh" >
            <Box sx={{backgroundColor: "white", borderRadius: "10px", p: 3,
          boxShadow: "0px 0px 4px 0px #00000040",}}>
            <ArgonBox pt={3} px={3} >
              {!header ? (
                <>
                  <ArgonBox mb={1}>
                    <ArgonTypography variant="h4" fontWeight="bold">
                      {title}
                    </ArgonTypography>
                  </ArgonBox>
                  <ArgonTypography variant="body2" fontWeight="regular" color="text">
                    {description}
                  </ArgonTypography>
                </>
              ) : (
                header
              )}
            </ArgonBox>
            <ArgonBox p={3}>{children}</ArgonBox>
            </Box>
          </ArgonBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of IllustrationLayout
OtpRegistrationLayout.defaultProps = {
  color: "info",
  header: "",
  title: "",
  description: "",
  button: { color: "info" },
  illustration: {},
};

// Typechecking props for the IllustrationLayout
OtpRegistrationLayout.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.object,
  children: PropTypes.node.isRequired,
  illustration: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default OtpRegistrationLayout;
