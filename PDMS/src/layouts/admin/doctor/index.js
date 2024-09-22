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
import doctorsData from "layouts/admin/doctor/data/doctorsTableData";
import { Stack } from "@mui/material";
import ArgonButton from "components/ArgonButton";
import AddHospitalModal from "layouts/admin/doctor/modal/addDoctor";
import { useEffect, useState } from "react";
import { fetchAllDoctors } from "services/admin/fetchAllDoctors";

function Hospital() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchAllDoctors().then((response) => {
      const { columns, rows } = doctorsData(response);
      setColumns(columns);
      setRows(rows);
    });
  }, [open]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card style={{ height: "85vh", overflowY: "scroll" }}>
            <Stack direction="row" justifyContent="space-between">
              <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <ArgonTypography variant="h6">Doctors List</ArgonTypography>
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
                  &nbsp;{"Add Doctor"}&nbsp;
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
              }}
            >
              <Table columns={columns} rows={rows} />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
      <AddHospitalModal open={open} setOpen={setOpen} />
    </DashboardLayout>
  );
}

export default Hospital;
