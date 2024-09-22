// @mui material components
import Grid from "@mui/material/Grid";
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ProfileInfoCard from "layouts/hospital/patientProfile/components/ProfileInfoCard";

// Overview page components
import Header from "layouts/hospital/patientProfile/components/Header";

// Data
import DoctorInsuranceList from "layouts/hospital/patientProfile/components/doctorInsuranceList";
import ReportInformation from "layouts/hospital/patientProfile/components/ReportInformation";
import { useParams } from "react-router-dom";
import { fetchPatientProfile } from "services/common/fetchPatient";
import { useState, useEffect } from "react";
import { useArgonController } from "context";
import { fetchAuthorisedDoctors } from "services/hospital/fetchAuthorisedDoctors";
import { fetchAuthorisedInsurances } from "services/hospital/fetchAuthorisedInsurances";
import { fetchPatientReports } from "services/hospital/fetchPatientList";

const bgImage =
  "https://images.pexels.com/photos/207601/pexels-photo-207601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

function Overview() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [pateientProfile, setPateientProfile] = useState({});
  const [reportType, setReportType] = useState("hospital");
  const [hospitalListData, setHospitalListData] = useState([]);
  const [insuranceListData, setInsuranceListData] = useState([]);
  const [patientReports, setPatientReports] = useState([]);
  const [controller] = useArgonController();
  const { auth } = controller;

  useEffect(() => {
    fetchPatientProfile(id).then((response) => {
      setPateientProfile(response.data);
    });
    fetchAuthorisedDoctors(id, auth.id).then((response) => {
      setHospitalListData(response);
    });
    fetchAuthorisedInsurances(id, auth.id).then((response) => {
      setInsuranceListData(response);
    });
  }, [open]);

  useEffect(() => {
    fetchPatientReports(id, auth.id).then((response) => {
      setPatientReports(response.reverse());
    });
  }, [openReport]);

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
      <Header patientData={pateientProfile} setReportType={setReportType} />
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
          <Grid item xs={12} xl={8}>
            <DoctorInsuranceList
              title={reportType === "hospital" ? "Authorized Doctors" : "Authorized Insurances"}
              list={reportType === "hospital" ? hospitalListData : insuranceListData}
              type={reportType}
              open={open}
              setOpen={setOpen}
            />
          </Grid>
          <Grid item xs={12} md={12} xl={12}>
            <ReportInformation
              patientReports={patientReports}
              open={openReport}
              setOpen={setOpenReport}
              name={pateientProfile.name}
            />
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}
export default Overview;
