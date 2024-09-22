/* eslint-disable react/prop-types */
// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonAvatar from "components/ArgonAvatar";
import Icon from "@mui/material/Icon";

const hospitalImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYhdQu0h19z4DvCi74Fgul3jX3tNL6QqQYaqQwwoEu-Uz1oP-XKUopb7teZoLQjGI7HDp6XwXEPyE&usqp=CAU&ec=48665701";

function Doctor({ image, name, email }) {
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

const doctorsData = (doctorsData) => {
  
  const columns = [
    { name: "doctor", align: "left" },
    { name: "phone", align: "center" },
    { name: "state", align: "center" },
    { name: "address", align: "center" },
    { name: "registrationUrl", align: "center" },
  ]

  const rows = doctorsData.map((doctor, key) => {
    return {
      doctor: <Doctor key={key} image={hospitalImageUrl} name={doctor.name} email={doctor.email} />,
      state: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {doctor.state}
        </ArgonTypography>
      ),
      phone: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
         {doctor.phone}
        </ArgonTypography>
      ),
      address: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
          {(doctor.address).substring(0, 10)}
        </ArgonTypography>
      ),
      registrationUrl: (
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium" >

          <a target="_blank" rel="noreferrer" href={doctor.faceRegistrationLink} onClick={()=>{
          navigator.clipboard.writeText(doctor.faceRegistrationLink);
        }}>copy</a>

        </ArgonTypography>
      ),
    }
  })

  return {columns,rows}
};

export default doctorsData