import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<ClientQueryParams | null>(null);

  const [input, setInput] = useState<LoginData>({
    login: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessageOpen, setErrorMessageOpen] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);

  const parseQueryParams = (): ClientQueryParams | null => {
    let splitParams = String(searchParams).split("&");
    let keyValuePairs = splitParams
      .map((param) => param.split("="))
      .map((arrayKeyValuePair) => {
        return {
          [arrayKeyValuePair[0]]: arrayKeyValuePair[1],
        };
      });

    let scopes = keyValuePairs.filter((pair) => "scopes" in pair).map((scopeObject) => scopeObject["scopes"]);

    let mergedObject = keyValuePairs
      .filter((pair) => "scopes" in pair === false)
      .reduce((obj, item) => Object.assign(obj, item));

    Object.assign(mergedObject, { scopes: scopes });

    if (
      mergedObject.hasOwnProperty("clientId") &&
      typeof mergedObject["clientId"] === "string" &&
      mergedObject.hasOwnProperty("redirectUrl") &&
      typeof mergedObject["redirectUrl"] === "string" &&
      mergedObject.hasOwnProperty("responseType") &&
      typeof mergedObject["responseType"] === "string" &&
      mergedObject.hasOwnProperty("scopes") &&
      Array.isArray(mergedObject["scopes"]) &&
      mergedObject["scopes"].every((value) => typeof value === "string") &&
      mergedObject.hasOwnProperty("state") &&
      typeof mergedObject["state"] === "string"
    ) {
      return {
        clientId: mergedObject["clientId"],
        redirectUrl: mergedObject["redirectUrl"],
        responseType: mergedObject["responseType"],
        scopes: Array.isArray(mergedObject["scopes"]) ? mergedObject["scopes"] : [],
        state: mergedObject["state"],
      } as ClientQueryParams;
    } else {
      return null;
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    navigate("/scopes", { state: { queryParams: queryParams, loginData: input } });
  };

  useEffect(() => {
    let clientQueryParams = parseQueryParams();
    if (clientQueryParams === null) {
      setErrorMessageOpen(true);
    } else {
      setQueryParams(clientQueryParams);
      setInputsDisabled(false);
    }
  }, []);

  return (
    <LoginPageStyled>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={errorMessageOpen}
        autoHideDuration={6000}
        onClose={() => setErrorMessageOpen(false)}
      >
        <Alert severity="error">Provided query parameters are invalid</Alert>
      </Snackbar>
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
