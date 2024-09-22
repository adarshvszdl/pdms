import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import SignIn from "layouts/authentication/sign-in";
import FaceRegistration from "layouts/authentication/face-registration";
import FaceVerification from "layouts/authentication/face-verification";

// Argon Dashboard 2 MUI example components
import Sidenav from "examples/Sidenav";

// Argon Dashboard 2 MUI themes
import theme from "assets/theme";
import themeDark from "assets/theme-dark";

// Argon Dashboard 2 MUI routes
import { hospitalRoutes, adminRoutes } from "routes";
// Argon Dashboard 2 MUI contexts
import { useArgonController, setMiniSidenav } from "context";

// Images
import brand from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

// Icon Fonts
import "assets/css/nucleo-icons.css";
import "assets/css/nucleo-svg.css";
import { insuranceRoutes } from "routes";
import { patientRoutes } from "routes";

export default function App() {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, direction, layout, sidenavColor, darkSidenav, darkMode, auth } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [tmpRoutes, setTmpRoutes] = useState([]);
  const [brandName, setBrandName] = useState("PMS DAPP");

  useEffect(() => {
    if (auth.role === "admin") {
      setTmpRoutes(adminRoutes);
      setBrandName("Admin Dash");
    } else if (auth.role === "doctor") {
      setTmpRoutes(hospitalRoutes);
      setBrandName("Hospital Dash");
    } else if (auth.role === "insurance") {
      setTmpRoutes(insuranceRoutes);
      setBrandName("Insurance Dash");
    } else if (auth.role === "patient") {
      setTmpRoutes(patientRoutes);
      setBrandName("Patient Profile");
    }
  }, [auth]);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={darkSidenav || darkMode ? brand : brandDark}
              brandName={brandName}
              routes={tmpRoutes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}

        <Routes>
          {/* if hospital is logged in only hospital routes are enabled */}
          {auth.role === "doctor" && getRoutes(hospitalRoutes)}

          {/* if admin is logged in only admin routes are enabled */}
          {auth.role === "admin" && getRoutes(adminRoutes)}

          {/* if insurance is logged in only insurance routes are enabled */}
          {auth.role === "insurance" && getRoutes(insuranceRoutes)}

          {/* if patient is logged in only patient routes are enabled */}
          {auth.role === "patient" && getRoutes(patientRoutes)}

          <Route
            exact
            path="/authentication/admin/sign-in"
            element={<SignIn role="Admin" title="Admin Sign In" />}
            key="admin-sign-in"
          />
          <Route
            exact
            path="/authentication/patient/sign-in"
            element={<SignIn role="Patient" title="Patient Sign In" />}
            key="patient-sign-in"
          />
          <Route
            exact
            path="/authentication/insurance/sign-in"
            element={<SignIn role="Insurance" title="Insurance Sign In" />}
            key="insurance-sign-in"
          />
          <Route
            exact
            path="/authentication/doctor/sign-in"
            element={<SignIn role="Doctor" title="Doctor Sign In" />}
            key="hospital-sign-in"
          />
          <Route
            exact
            path="authentication/face-registration"
            element={<FaceRegistration />}
            key="face-registration"
          />
          <Route
            exact
            path="authentication/face-verification"
            element={<FaceVerification />}
            key="face-verification"
          />

          {/* if admin is logged in and any random route is accessed the page is redirected to admin dashboard */}
          {auth.role === "admin" && <Route path="*" element={<Navigate to="/admin/doctors" />} />}

          {/* if hospital is logged in and any random route is accessed the page is redirected to hospital dashboard */}
          {auth.role === "doctor" && (
            <Route path="*" element={<Navigate to="/doctor/patients" />} />
          )}

          {/* if insurance is logged in and any random route is accessed the page is redirected to insurance dashboard */}
          {auth.role === "insurance" && (
            <Route path="*" element={<Navigate to="/insurance/patients" />} />
          )}

          {/* if patient is logged in and any random route is accessed the page is redirected to insurance patient */}
          {auth.role === "patient" && (
            <Route path="*" element={<Navigate to={`/patient/profile/${auth.id}`} />} />
          )}

          {/* if noone is logged in and any random route is accessed the page is redirected to admin signin */}
          {!auth.role && (
            <Route path="*" element={<Navigate to="/authentication/admin/sign-in" />} />
          )}
        </Routes>
      </>
    </ThemeProvider>
  );
}
