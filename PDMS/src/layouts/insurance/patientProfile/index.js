// @mui material components
import Grid from "@mui/material/Grid";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "layouts/insurance/patientProfile/components/ProfileInfoCard";

// Overview page components
import Header from "layouts/insurance/patientProfile/components/Header";

// Data

import ReportInformation from "layouts/insurance/patientProfile/components/ReportInformation";
import { useParams } from "react-router-dom";
import { fetchPatientProfile } from "services/common/fetchPatient";
import { useState, useEffect } from "react";
import { useArgonController } from "context";
import { fetchPatientReports } from "services/insurance/fetchPatientList";

const bgImage =
  "https://images.pexels.com/photos/207601/pexels-photo-207601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

function Overview() {
  const { id } = useParams();
  const [pateientProfile, setPateientProfile] = useState({});
  const [patientReports, setPatientReports] = useState([]);
  const [controller] = useArgonController();
  const { auth } = controller;

  useEffect(() => {
    fetchPatientProfile(id).then((response) => {
      setPateientProfile(response.data);
    });
  }, []);

  useEffect(() => {
    fetchPatientReports(id, auth.id).then((response) => {
      setPatientReports(response.reverse());
    });
  }, []);

  return (
    <DashboardLayout
      sx={{
        backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          `${linearGradient(
            rgba(gradients.info.main, 0.6),
            rgba(gradients.info.state, 0.6)
          )}, url(${bgImage})`,
        backgroundPositionY: "50%",
      }}
    >
      <Header patientData={pateientProfile} />
      <ArgonBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="profile information"
              info={{
                fullName: pateientProfile.name,
                mobile: pateientProfile.phone,
                email: pateientProfile.email,
                gender: pateientProfile.gender,
                dob: pateientProfile.dob,
                address: pateientProfile.address,
                state: pateientProfile.state,
              }}
            />
          </Grid>
          <Grid item xs={12} md={12} xl={8}>
            <ReportInformation
              patientReports={patientReports}
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}
export default Overview;
