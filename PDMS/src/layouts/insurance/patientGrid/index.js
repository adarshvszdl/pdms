// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
// Argon Dashboard 2 MUI examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Table from "examples/Tables/Table";

// Data
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAuthorisedPatients } from "services/insurance/fetchAuthorisedPatients";
import { useArgonController } from "context";
import patientData from "layouts/insurance/patientGrid/data/patientTableData";

function PatientGrid() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [controller] = useArgonController();
  const { auth } = controller;
  

  useEffect(() => {
    fetchAuthorisedPatients().then((response) => {
      const { columns, rows } = patientData(response);
      setColumns(columns);
      setRows(rows);
    });
  }, []);

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
            </Stack>
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
                height: "75vh", overflowY: "scroll"
              }}
            >
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default PatientGrid;
