// react-routers components
/* eslint-disable react/prop-types */
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";


// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonButton from "components/ArgonButton";
import { Icon, Tooltip } from "@mui/material";
import AssignHospitalInsuranceModal from "layouts/hospital/patientProfile/components/modal/assignHospitalInsurance";
const hospitalImageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYhdQu0h19z4DvCi74Fgul3jX3tNL6QqQYaqQwwoEu-Uz1oP-XKUopb7teZoLQjGI7HDp6XwXEPyE&usqp=CAU&ec=48665701";
const insuranceCompanyImageUrl =
  "https://img.freepik.com/premium-vector/concept-vector-illustration-life-insurance-protection-health-life-flat-vector-illustration_98702-1374.jpg";

function HospitalInsuranceList({ title, list, type, open, setOpen }) {
  const renderProfiles = list.map(({ name, email }, index) => (
    <ArgonBox key={index} component="li" display="flex" alignItems="center" py={1} mb={1}>
      <ArgonBox mr={2}>
        <ArgonAvatar
          src={type === "hospital" ? hospitalImageUrl : insuranceCompanyImageUrl}
          alt="something here"
          variant="rounded"
          shadow="md"
        />
      </ArgonBox>
      <ArgonBox
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <ArgonTypography variant="button" fontWeight="medium">
          {name}
        </ArgonTypography>
        <ArgonTypography variant="caption" color="text">
          {email}
        </ArgonTypography>
      </ArgonBox>
      {/* <ArgonBox ml="auto">
        <ArgonButton variant="outline" color={"black"}>
          Delete
        </ArgonButton>
      </ArgonBox> */}
    </ArgonBox>
  ));

  return (
    <Card>
      <ArgonBox
        pt={2}
        px={2}
        pb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </ArgonTypography>
        <ArgonTypography
          variant="body2"
          color="secondary"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Tooltip
            title={type === "hospital" ? "Authorize new hospital" : "Authorize new insurance"}
            placement="top"
          >
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
              &nbsp;{"Authorize"}&nbsp;
            </ArgonButton>
          </Tooltip>
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox p={2} sx={{ height: "40vh", overflowY: "scroll" }}>
        <ArgonBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderProfiles}
        </ArgonBox>
      </ArgonBox>
      <AssignHospitalInsuranceModal open={open} setOpen={setOpen} type={type} />
    </Card>
  );
}
// Typechecking props for the ProfilesList
HospitalInsuranceList.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};
export default HospitalInsuranceList;
