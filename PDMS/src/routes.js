// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import Hospital from "layouts/admin/doctor";
import Insurance from "layouts/admin/insurance";
import PatientGrid from "layouts/hospital/patientGrid";
import PatientProfile from "layouts/hospital/patientProfile";
import InsurancePatientGrid from "layouts/insurance/patientGrid";
import InsurancePatientProfile from "layouts/insurance/patientProfile";
import PatientProfilePatient from "layouts/patient/patientProfile";

export const adminRoutes = [
  {
    type: "route",
    name: "Doctors",
    key: "doctors",
    route: "admin/doctors",
    icon: <ArgonBox component="i" color="error" fontSize="14px" className="ni ni-building" />,
    component: <Hospital />,
  },
  {
    type: "route",
    name: "Insurances",
    key: "insurance-companies",
    route: "admin/insurance-companies",
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-credit-card" />,
    component: <Insurance />,
  },
];
export const hospitalRoutes = [
  {
    type: "route",
    name: "Patients",
    key: "patients",
    route: "/doctor/patients",
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-02" />,
    component: <PatientGrid />,
  },
  {
    type: "route",
    name: "Patient Profile Hospital",
    key: "patient-profile",
    route: "/doctor/patient-profile/:id",
    icon: <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
    component: <PatientProfile />,
  },
];

export const patientRoutes = [
  {
    type: "route",
    name: "Profile",
    key: "profile",
    route: "/patient/profile/:id",
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-02" />,
    component: <PatientProfilePatient />,
  },
];

export const insuranceRoutes = [
  {
    type: "route",
    name: "Patients",
    key: "patients",
    route: "/insurance/patients",
    icon: <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-02" />,
    component: <InsurancePatientGrid />,
  },
  {
    // type: "route",
    // name: "Patient Profile Hospital",
    // key: "patient-profile",
    route: "/insurance/patient-profile/:id",
    icon: <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
    component: <InsurancePatientProfile />,
  },
];

