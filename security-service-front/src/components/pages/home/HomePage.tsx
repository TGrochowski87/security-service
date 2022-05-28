import icon from "assets/security-icon.png";
import { HomePageStyled, Logo } from "./HomePage.Styles";
import Navbar from "./Navbar";

interface Props {
  adminLoggedIn: boolean;
  setAdminLoggedIn: Function;
}

const HomePage = ({ adminLoggedIn, setAdminLoggedIn }: Props) => {
  return (
    <HomePageStyled>
      <Navbar adminLoggedIn={adminLoggedIn} setAdminLoggedIn={setAdminLoggedIn} />
      <Logo src={icon} alt="logo" />
      <br />
      <h2>
        Welcome to <span className="highlighted-text">Security Service</span> authorization server.
      </h2>
    </HomePageStyled>
  );
};

export default HomePage;
