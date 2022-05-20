import { Button } from "@mui/material";
import axios from "axios";
import { RedirectData } from "models/RedirectData";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { buildAuthServerUrl } from "tools/urlQueryHandler";
import { AppStyled, ButtonSpace } from "./App.Styles";

function App() {
  const location = useLocation();

  const redirectData = useRef<RedirectData>({
    responseType: "code",
    clientId: "4a94380e-5c20-40ac-af63-00aea75aa1c2",
    redirectUrl: "http://localhost:3001/",
    scopes: ["Friends", "Timeline"],
    state: "fadgfag3df58knfd0ns26klg3n1dfklgjn",
  });
  const authServerBaseUrl = useRef("http://localhost:3000/login");
  const [authServerUrl, setAuthServerUrl] = useState<string>("");
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const authServerUrl = buildAuthServerUrl(authServerBaseUrl.current, redirectData.current);
    setAuthServerUrl(authServerUrl);
  }, []);

  useEffect(() => {
    if (location.search !== undefined && location.search.length > 0) {
      let query = location.search;

      if (isAuthServerRedirectQueryValid(query)) {
        query = query.replace("?code=", "");
        const code = query.split("&")[0];
        setCode(code);
      }
    }
  }, [location]);

  const isAuthServerRedirectQueryValid = (query: string): boolean =>
    query.includes("code") && query.includes("state") && query.split("=").at(-1) === redirectData.current.state;

  const getToken = () => {
    if (code.length > 0) {
      axios
        .get<string>(`https://localhost:7171/users/token/${code}`)
        .then((response) => {
          sessionStorage.setItem("token", response.data);
        })
        .catch((error) => console.log(error));
    }
  };

  const getResource = () => {
    const token = sessionStorage.getItem("token");

    if (token !== null) {
    }
  };

  return (
    <AppStyled>
      <ButtonSpace>
        <a href={authServerUrl}>
          <Button variant="contained">Log in</Button>
        </a>
        <Button variant="contained" onClick={getToken}>
          Get Authorization token
        </Button>
        <Button variant="contained">Get protected resource</Button>
      </ButtonSpace>
      <h3>{`Authorization code: ${code}`}</h3>
    </AppStyled>
  );
}

export default App;
