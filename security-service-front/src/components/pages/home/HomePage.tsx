import icon from "assets/security-icon.png";
import { HomePageStyled, Logo } from "./HomePage.Styles";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <HomePageStyled>
      <Navbar />
      <Logo src={icon} alt="logo" />
      <br />
      <h2>
        Welcome to <span className="highlighted-text">Security Service</span> authorization server.
      </h2>
    </HomePageStyled>
  );
};

export default HomePage;
