import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";

import ScopeList from "./scope-list/ScopeList";
import Scope from "utilities/models/Scope";
import ClientQueryParams from "utilities/models/ClientQueryParams";

import { ButtonSpace, ListSpace, PageHeader, ScopesPageStyled } from "./ScopesPage.Styles";
import { getAuthorizationCode, getClientName, getScopes } from "utilities/tools/api";
import { buildFailedCodeRedirect, buildSuccessfulCodeRedirect } from "utilities/tools/urlQueryHandler";

interface NavigationState {
  queryParams: ClientQueryParams;
  userId: string;
}

const ScopesPage = () => {
  const location = useLocation();
  const [clientQueryParams, setClientQueryParams] = useState<ClientQueryParams | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [scopes, setScopes] = useState<Scope[]>([]);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const checkHandler = (scopeName: string) => {
    setScopes((prevState) =>
      prevState.map((scope) =>
        scope.name === scopeName && scope.requested === false ? { ...scope, checked: !scope.checked } : scope
      )
    );
  };

  const submitHandler = () => {
    getAuthorizationCode(userId, clientQueryParams!.scopes)
      .then((code: string) => {
        var url =
          code.length > 0
            ? buildSuccessfulCodeRedirect(clientQueryParams!.redirectUrl, code, clientQueryParams!.state)
            : buildFailedCodeRedirect(clientQueryParams!.redirectUrl, clientQueryParams!.state);
        window.location.replace(url);
      })
      .catch((error) => {
        var url = buildFailedCodeRedirect(clientQueryParams!.redirectUrl, clientQueryParams!.state);
        window.location.replace(url);
      });
  };

  useEffect(() => {
    if (clientQueryParams === null) return;

    getClientName(clientQueryParams.clientId)
      .then((clientName: string) => setClientName(clientName))
      .catch((error) => {
        setErrorMessage("Could not retrieve client application info. Please try again later.");
        setInputsDisabled(true);
      });

    getScopes()
      .then((retrievedScopes: string[]) => {
        let mappedScopes = retrievedScopes.map((scope) => {
          return {
            name: scope,
            checked: clientQueryParams?.scopes.includes(scope),
            requested: clientQueryParams?.scopes.includes(scope),
          } as Scope;
        });
        setScopes(mappedScopes);
      })
      .catch((error) => {
        setErrorMessage("Could not retrieve permissions from the server. Please try again later.");
        setInputsDisabled(true);
      });
  }, [clientQueryParams]);

  useEffect(() => {
    if (scopes.length > 0 && clientName.length > 0) {
      setInputsDisabled(false);
      setLoading(false);
    }
  }, [clientName, scopes]);

  useEffect(() => {
    const { queryParams, userId } = location.state as NavigationState;
    setClientQueryParams(queryParams);
    setUserId(userId);
  }, [location.state]);

  return (
    <ScopesPageStyled>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={errorMessage.length > 0}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <PageHeader>
            <span className="highlighted-text">{clientName}</span> is requesting your permission
          </PageHeader>
          <ListSpace>
            <p>Uncheck the permissions you do not wish to grant.</p>
            <ScopeList scopes={scopes} checkHandler={checkHandler} />
          </ListSpace>
          <ButtonSpace>
            <Button variant="contained" disabled={inputsDisabled} onClick={submitHandler}>
              Approve
            </Button>
            <a href={buildFailedCodeRedirect(clientQueryParams!.redirectUrl, clientQueryParams!.state)}>
              <Button variant="contained" style={{ backgroundColor: "lightgray" }} disabled={inputsDisabled}>
                Do not approve
              </Button>
            </a>
          </ButtonSpace>
        </>
      )}
    </ScopesPageStyled>
  );
};

export default ScopesPage;
