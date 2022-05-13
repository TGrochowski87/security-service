import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { AppStyled, ButtonSpace } from "./App.Styles";

function App() {
  const redirectData = useRef({
    responseType: "code",
    clientId: "774a0068e9c04e97ba6a96f85f61c05c",
    redirectUrl: "http://localhost:3001/",
    scopes: ["scope1", "scope2"],
    state: "fadgfag3df58knfd0ns26klg3n1dfklgjn",
  });
  const authServerBaseUrl = useRef("http://localhost:3000/login");
  const [authServerUrl, setAuthServerUrl] = useState<string>("");

  const buildAuthServerUrl = (): string => {
    let query = "";
    const queryParams = Object.entries(redirectData.current);
    for (let entry of queryParams) {
      if (Array.isArray(entry[1])) {
        for (let value of entry[1]) {
          query += `${entry[0]}=${value}&`;
        }
      } else {
        query += `${entry[0]}=${entry[1]}&`;
      }
    }
    const finalUrl = `${authServerBaseUrl.current}?${query}`;

    return finalUrl;
  };

  useEffect(() => {
    const authServerUrl = buildAuthServerUrl();
    setAuthServerUrl(authServerUrl);
  }, []);

  return (
    <AppStyled>
      <ButtonSpace>
        <a href={authServerUrl}>
          <Button variant="contained">Log in</Button>
        </a>
        <Button variant="contained">Get protected resource</Button>
      </ButtonSpace>
    </AppStyled>
  );
}

export default App;
