// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Table from "examples/Tables/Table";

// Data
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Stack } from "@mui/material";
import ArgonButton from "components/ArgonButton";
import { useEffect, useState } from "react";
import AddPatientModal from "layouts/hospital/patientGrid/modal/addPatient";
import { fetchAuthorisedPatients } from "services/hospital/fetchAuthorisedPatients";
import { useArgonController } from "context";
import patientData from "layouts/hospital/patientGrid/data/patientTableData";

function PatientGrid() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [controller] = useArgonController();
  const { auth } = controller;

  useEffect(() => {
    fetchAuthorisedPatients(auth.id).then((response) => {
      console.log(response)
      const { columns, rows } = patientData(response);
      setColumns(columns);
      setRows(rows);
    });
  }, [open]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <Stack direction="row" justifyContent="space-between">
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Patient List</ArgonTypography>
              </ArgonBox>
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonButton
                  component="a"
                  target="_blank"
                  rel="noreferrer"
                  color="dark"
                  fullWidth
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                  &nbsp;{"Add Patient"}&nbsp;
                </ArgonButton>
              </ArgonBox>
            </Stack>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
                height: "75vh",
                overflowY: "scroll",
              }}
            >
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
      <AddPatientModal open={open} setOpen={setOpen} />
    </DashboardLayout>
  );
}

export default PatientGrid;
