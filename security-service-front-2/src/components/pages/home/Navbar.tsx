import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavbarStyled } from "./Navbar.Styled";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <NavbarStyled>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/control-panel");
        }}
      >
        Control Panel
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/login/admin");
        }}
      >
        Log in as administrator
      </Button>
    </NavbarStyled>
  );
};

export default Navbar;
