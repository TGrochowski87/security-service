import { FormEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import icon from "assets/security-icon.png";
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
import ClientQueryParams from "utilities/models/ClientQueryParams";
import LoginData from "utilities/models/LoginData";
import { buildCodeRedirect, parseClientQueryParams } from "utilities/tools/urlQueryHandler";
import { getClientName, loginUser } from "utilities/tools/api";
import LoadingOverlay from "components/common/LoadingOverlay";

const LoginPage = () => {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState<ClientQueryParams | null>(null);
  const [clientName, setClientName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [input, setInput] = useState<LoginData>({
    login: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    loginUser(input, queryParams!.clientId)
      .then((code: string) => {
        setLoading(false);
        var url = buildCodeRedirect(queryParams!.redirectUrl, code, queryParams!.state);
        window.location.replace(url);
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

  useEffect(() => {
    if (queryParams === null) return;

    setLoading(true);
    getClientName(queryParams!.clientId)
      .then((clientName: string) => {
        setClientName(clientName);
        setLoading(false);
      })
      .catch((error) => {
        setInputsDisabled(true);
        setLoading(false);

        if (error.response.status === 400) {
          setErrorMessage("Could not retrieve client application info. Please try again later.");
        } else {
          setErrorMessage("Something went wrong. Please try again later.");
        }
      });
  }, [queryParams]);

  useEffect(() => {
    let clientQueryParams = parseClientQueryParams(location.search);
    if (clientQueryParams === null) {
      setErrorMessage("Provided query parameters are invalid.");
    } else {
      setQueryParams(clientQueryParams);
      setInputsDisabled(false);
    }
  }, []);

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
      <p>
        <span className="highlighted-text">{clientName}</span> is requesting access to your account's data
      </p>
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
              disabled={inputsDisabled}
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
              disabled={inputsDisabled}
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
          <Button variant="contained" type="submit" disabled={inputsDisabled}>
            Log in
          </Button>
        </InputSpace>
      </Form>
    </LoginPageStyled>
  );
};

export default LoginPage;
