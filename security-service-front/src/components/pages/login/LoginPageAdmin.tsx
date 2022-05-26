import { FormEvent, useState } from "react";

import icon from "assets/security-icon-admin.png";
import { Form, InputSpace, LoginPageStyled, Logo } from "./LoginPage.Styles";
import {
  Alert,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginData from "utilities/models/LoginData";
import LoadingOverlay from "components/common/LoadingOverlay";
import { loginAdmin } from "utilities/tools/api";
import { useNavigate } from "react-router-dom";

interface Props {
  setAdminLoggedIn: Function;
}

const LoginPageAdmin = ({ setAdminLoggedIn }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<LoginData>({
    login: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    loginAdmin(input)
      .then(() => {
        setAdminLoggedIn(true);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);

        if (error.response.status === 400) {
          setErrorMessage("Invalid credentials.");
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <LoginPageStyled>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={errorMessage.length > 0}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      {loading && <LoadingOverlay />}
      <Logo src={icon} alt="logo" />
      <Form onSubmit={handleSubmit}>
        <InputSpace>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-username"
              label="Username"
              type={"text"}
              required
              value={input.login}
              onChange={(event) =>
                setInput((prevState) => {
                  return { ...prevState, login: event.target.value };
                })
              }
            />
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="Password"
              required
              type={showPassword ? "text" : "password"}
              value={input.password}
              onChange={(event) =>
                setInput((prevState) => {
                  return { ...prevState, password: event.target.value };
                })
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => {
                      setShowPassword(false);
                    }}
                    onMouseLeave={() => {
                      setShowPassword(false);
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Button variant="contained" type="submit">
            Log in
          </Button>
        </InputSpace>
      </Form>
    </LoginPageStyled>
  );
};

export default LoginPageAdmin;
