import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";

import ScopeList from "./scope-list/ScopeList";
import Scope from "utilities/models/Scope";
import ClientQueryParams from "utilities/models/ClientQueryParams";

import { ButtonSpace, ListSpace, PageHeader, ScopesPageStyled } from "./ScopesPage.Styles";
import LoginData from "utilities/models/LoginData";
import { getAuthorizationCode, getClientName, getScopes } from "utilities/tools/api";
import { buildFailedCodeRedirect } from "utilities/tools/urlQueryHandler";

interface NavigationState {
  queryParams: ClientQueryParams;
  loginData: LoginData;
}

const ScopesPage = () => {
  const location = useLocation();
  const [clientQueryParams, setClientQueryParams] = useState<ClientQueryParams | null>(null);
  const [credentials, setCredentials] = useState<LoginData | null>(null);
  const [clientName, setClientName] = useState<string>("");
  const [scopes, setScopes] = useState<Scope[]>([]);

  const [errorMessageOpen, setErrorMessageOpen] = useState<boolean>(false);
  const [inputsDisabled, setInputsDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const checkHandler = (scopeName: string) => {
    setScopes((prevState) =>
      prevState.map((scope) => (scope.name === scopeName ? { ...scope, checked: !scope.checked } : scope))
    );
  };

  const submitHandler = () => {
    getAuthorizationCode(credentials!, clientQueryParams!.scopes)
      .then((code: string) => console.log())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (clientQueryParams === null) return;

    getClientName(clientQueryParams.clientId)
      .then((clientName: string) => setClientName(clientName))
      .catch((error) => {
        setErrorMessageOpen(true);
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
        setErrorMessageOpen(true);
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
    const { queryParams, loginData } = location.state as NavigationState;
    setClientQueryParams(queryParams);
    setCredentials(loginData);
  }, [location.state]);

  return (
    <ScopesPageStyled>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={errorMessageOpen}
        autoHideDuration={6000}
        onClose={() => setErrorMessageOpen(false)}
      >
        <Alert severity="error">Could not retrieve permissions from the server. Please try again later.</Alert>
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
