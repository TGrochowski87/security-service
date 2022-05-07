import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import TextField from "@mui/material/TextField";

import icon from "assets/security-icon.png";
import { InputSpace, LoginPageStyled, Logo } from "./LoginPage.Styles";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<String>(String(searchParams));

  return (
    <LoginPageStyled>
      <Logo src={icon} alt="logo" />
      <InputSpace>
        <TextField label="Username" variant="outlined" type={"text"} />
        <TextField label="Password" variant="outlined" type={"password"} />
      </InputSpace>
    </LoginPageStyled>
  );
};

export default LoginPage;
