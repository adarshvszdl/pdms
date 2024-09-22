/* eslint-disable react/prop-types */
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import ArgonButton from "components/ArgonButton";
import { useNavigate } from "react-router-dom";

import VisibilityIcon from "@mui/icons-material/Visibility";

const patientImageUrl = "https://cdn-icons-png.flaticon.com/512/1430/1430453.png";

function NameAndEmail({ image, name, email }) {
  return (
    <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
      <ArgonBox mr={2}>
        <ArgonAvatar src={image} alt={name} size="sm" variant="rounded" />
      </ArgonBox>
      <ArgonBox display="flex" flexDirection="column">
        <ArgonTypography variant="button" fontWeight="medium">
          {name}
        </ArgonTypography>
        <ArgonTypography variant="caption" color="secondary">
          {email}
        </ArgonTypography>
      </ArgonBox>
    </ArgonBox>
  );
}



function ViewProfile(params) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    navigate(`/doctor/patient-profile/${params.id}`);
  };

  return (
    <ArgonBox display="flex" alignItems="center" px={1} py={0.5}>
      <ArgonButton color="dark" size="medium" fullWidth onClick={(event)=>{handleClick(event)}}>
        <VisibilityIcon /> &nbsp; View
      </ArgonButton>
    </ArgonBox>
  );
}

const patientData = (patientsArray) => {
  const columns = [
    { name: "patient", align: "left" },
    { name: "phone", align: "center" },
    { name: "state", align: "center" },
    { name: "registrationUrl", align: "center" },
    { name: "profile", align: "center" },
  ];

  console.log(patientsArray)

  const rows = patientsArray.map((patient, key) => {
    return {
      patient: (
        <NameAndEmail key={key} image={patientImageUrl} name={patient?.name} email={patient?.email} />
      ),
      state: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
         {patient?.state}
        </ArgonTypography>
      ),
      phone: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
         {patient?.phone}
        </ArgonTypography>
      ),
      registrationUrl: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium" >

          <a target="_blank" rel="noreferrer" href={patient?.faceRegistrationLink} onClick={()=>{
          navigator.clipboard.writeText(patient?.faceRegistrationLink);
        }}>copy</a>

        </ArgonTypography>
      ),
      profile: (<ViewProfile id={patient?.patientId} />),
    };
  });
  return { columns, rows };
};

export default patientData;
