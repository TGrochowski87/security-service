import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavbarStyled } from "./Navbar.Styled";

interface Props {
  adminLoggedIn: boolean;
  setAdminLoggedIn: Function;
}

const Navbar = ({ adminLoggedIn, setAdminLoggedIn }: Props) => {
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
      {adminLoggedIn ? (
        <Button
          variant="outlined"
          onClick={() => {
            sessionStorage.removeItem("token");
            setAdminLoggedIn(false);
          }}
        >
          Log out
        </Button>
      ) : (
        <Button
          variant="outlined"
          onClick={() => {
            navigate("/login/admin");
          }}
        >
          Log in as administrator
        </Button>
      )}
    </NavbarStyled>
  );
};

export default Navbar;
