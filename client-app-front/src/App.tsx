import { Button } from "@mui/material";
import { RedirectData } from "models/RedirectData";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getResource, getToken } from "tools/api";
import { buildAuthServerUrl } from "tools/urlQueryHandler";
import { AppStyled, ButtonSpace } from "./App.Styles";

function App() {
  const location = useLocation();

  const redirectData = useRef<RedirectData>({
    responseType: "code",
    clientId: "4a94380e-5c20-40ac-af63-00aea75aa1c2",
    redirectUrl: "http://localhost:3001/",
    state: "fadgfag3df58knfd0ns26klg3n1dfklgjn",
  });
  const authServerBaseUrl = useRef("http://localhost:3000/login");
  const [authServerUrl, setAuthServerUrl] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [resource, setResource] = useState<string>("");

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

  const handleGetToken = () => {
    if (code.length > 0) {
      getToken(code);
    }
  };

  const handleGetResource = () => {
    const token = sessionStorage.getItem("token");

    if (token !== null) {
      getResource(token).then((friends) => setResource(friends));
    }
  };

  return (
    <AppStyled>
      <ButtonSpace>
        <a href={authServerUrl}>
          <Button variant="contained">Log in</Button>
        </a>
        <Button variant="contained" onClick={handleGetToken}>
          Get Authorization token
        </Button>
        <Button variant="contained" onClick={handleGetResource}>
          Get protected resource
        </Button>
      </ButtonSpace>
      <h3>{`Authorization code: ${code}`}</h3>
      <h3>{`Authorization token: ${sessionStorage.getItem("token")?.toString()}`}</h3>
      <h3>{`Protected resource: ${resource}`}</h3>
    </AppStyled>
  );
}

export default App;
