// react-routers components
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

function ProfileInfoCard({ title, info }) {
  const labels = [];
  const values = [];
  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <ArgonBox key={label} display="flex" py={1} pr={2}>
      <ArgonTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
        fontSize=".9rem"
      >
        {label}: &nbsp;
      </ArgonTypography>
      <ArgonTypography variant="button" fontWeight="regular" color="text" fontSize=".8rem">
        &nbsp;{values[key]}
      </ArgonTypography>
    </ArgonBox>
  ));

  // Render the card social media icons

  return (
    <Card sx={{ height: "100%" }}>
      <ArgonBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </ArgonTypography>
      </ArgonBox>
      <ArgonBox p={2}>
        <ArgonBox>{renderItems}</ArgonBox>
      </ArgonBox>
    </Card>
  );
}

// Typechecking props for the ProfileInfoCard
ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProfileInfoCard;
