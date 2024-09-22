/* eslint-disable react/prop-types */
// @mui material components
import { Icon, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import ArgonTypography from "components/ArgonTypography";

// Report page components
import Report from "layouts/hospital/patientProfile/components/Report";
import AddPatientReportModal from "layouts/hospital/patientProfile/components/modal/addPatientReport";

function ReportInformation({ patientReports, open, setOpen,name }) {
  return (
    <Card id="delete-account">
      <ArgonBox
        pt={3}
        px={2}
        pb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <ArgonTypography variant="h6" fontWeight="medium">
          Patient Reports
        </ArgonTypography>
        {/* <ArgonTypography
          variant="body2"
          color="secondary"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Tooltip title={"Add report"} placement="top">
            <ArgonButton
              component="button"
              rel="noreferrer"
              color="dark"
              fullWidth
              onClick={() => {
                setOpen(true);
              }}
            >
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;{"Add New Report"}&nbsp;
            </ArgonButton>
          </Tooltip>
        </ArgonTypography> */}
      </ArgonBox>
      <ArgonBox pt={1} pb={2} px={2} sx={{ height: "50vh", overflowY: "scroll" }}>
        <ArgonBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {patientReports.map((item, key) => {
            return (
              <Report
                key={key}
                dateOfVisit={item.dateOfVisit}
                causeOfVisit={item.causeOfVisit}
                condition={item.condition}
                description={item.description}
                doctor={item.doctor}
                medication={item.medication}
                hospitalId={"d82971db-33b3-43ca-ab88-07de1ff71184"}
                reportId={item.medicalReportId}
                hospitalName={"PDMS"}
                name={name}
              />
            );
          })}
        </ArgonBox>
      </ArgonBox>
      <AddPatientReportModal open={open} setOpen={setOpen} />
    </Card>
  );
}

export default ReportInformation;
