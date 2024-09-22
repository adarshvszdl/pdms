// Argon Dashboard 2 MUI components
import ArgonButton from "components/ArgonButton";
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI context
import { useArgonController } from "context";
import { useNavigate } from "react-router-dom";

import { setAuth } from "context";

function SidenavFooter() {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, auth } = controller;
  const navigate = useNavigate();

  const handleLogout = ()=>{
    if (auth.role==='admin'){
      localStorage.setItem("auth", JSON.stringify({ role: "", id: "" }));
      setAuth(dispatch, {})
      navigate("authentication/admin/sign-in");
    }
    if (auth.role==='doctor'){
      localStorage.setItem("auth", JSON.stringify({ role: "", id: "" }));
      setAuth(dispatch, {})
      navigate('authentication/doctor/sign-in')
    }
    if (auth.role==='insurance'){
      localStorage.setItem("auth", JSON.stringify({ role: "", id: "" }));
      setAuth(dispatch, {})
      navigate('authentication/insurance/sign-in')
    }
    if (auth.role==='patient'){
      localStorage.setItem("auth", JSON.stringify({ role: "", id: "" }));
      setAuth(dispatch, {})
      navigate('authentication/patient/sign-in')
    }
  }


  return (
    <ArgonBox opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <ArgonBox display="flex" flexDirection="column">
        <ArgonButton
          onClick={()=>{handleLogout()}}
          rel="noreferrer"
          color="dark"
          size="small"
          fullWidth
          sx={{ mb: 1 }}
        >
          Log out
        </ArgonButton>
      </ArgonBox>
    </ArgonBox>
  );
}

export default SidenavFooter;
