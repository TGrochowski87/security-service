import { Button } from "@mui/material";
import { RedirectData } from "models/RedirectData";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getFriends, getPhotos, getTimeline, getToken } from "tools/api";
import { buildAuthServerUrl } from "tools/urlQueryHandler";
import { AppStyled, ButtonSpace } from "./App.Styles";

interface Resources {
  friends: string;
  photos: string;
  timeline: string;
}

function App() {
  const forbiddenMessage = "Forbidden";
  const location = useLocation();

  const redirectData = useRef<RedirectData>({
    responseType: "code",
    clientId: "39a3e57f-e2f0-472d-abc9-f163801ea58d",
    redirectUrl: "http://localhost:3003/",
    state: "fadgfag3df58knfd0ns26klg3n1dfklgjn",
  });
  const authServerBaseUrl = useRef("http://localhost:3000/login");
  const [authServerUrl, setAuthServerUrl] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [resources, setResources] = useState<Resources>({
    friends: "",
    photos: "",
    timeline: "",
  });

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

  const handleGetFriends = () => {
    const token = sessionStorage.getItem("token");

    if (token !== null) {
      getFriends(token)
        .then((friends) =>
          setResources((prevState: Resources) => {
            return { ...prevState, friends: friends };
          })
        )
        .catch((error) => {
          if (error.response.status === 403) {
            setResources((prevState: Resources) => {
              return { ...prevState, friends: forbiddenMessage };
            });
          }
        });
    }
  };

  const handleGetPhotos = () => {
    const token = sessionStorage.getItem("token");

    if (token !== null) {
      getPhotos(token)
        .then((photos) =>
          setResources((prevState: Resources) => {
            return { ...prevState, photos: photos };
          })
        )
        .catch((error) => {
          if (error.response.status === 403) {
            setResources((prevState: Resources) => {
              return { ...prevState, photos: forbiddenMessage };
            });
          }
        });
    }
  };

  const handleGetTimeline = () => {
    const token = sessionStorage.getItem("token");

    if (token !== null) {
      getTimeline(token)
        .then((timeline) =>
          setResources((prevState: Resources) => {
            return { ...prevState, timeline: timeline };
          })
        )
        .catch((error) => {
          if (error.response.status === 403) {
            setResources((prevState: Resources) => {
              return { ...prevState, timeline: forbiddenMessage };
            });
          }
        });
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
        <Button variant="contained" onClick={handleGetFriends}>
          Get friends
        </Button>
        <Button variant="contained" onClick={handleGetPhotos}>
          Get photos
        </Button>
        <Button variant="contained" onClick={handleGetTimeline}>
          Get timeline
        </Button>
      </ButtonSpace>
      <hr />
      <h1>Auth section</h1>
      <h3>{`Authorization code: ${code}`}</h3>
      <h3>{`Authorization token: ${sessionStorage.getItem("token")?.toString()}`}</h3>
      <hr />
      <h1>Resource section</h1>
      <h3>{`Friends: ${resources.friends}`}</h3>
      <h3>{`Photos: ${resources.photos}`}</h3>
      <h3>{`Timeline: ${resources.timeline}`}</h3>
      <hr />
    </AppStyled>
  );
}

export default App;
