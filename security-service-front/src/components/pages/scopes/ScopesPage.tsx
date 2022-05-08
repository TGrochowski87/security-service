import { ButtonSpace, ListSpace, PageHeader, ScopesPageStyled } from "./ScopesPage.Styles";
import { clientMock, scopesMock } from "utilities/mocks";
import { useEffect, useRef, useState } from "react";
import ScopeList from "./scope-list/ScopeList";
import Scope from "utilities/models/Scope";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import ClientQueryParams from "utilities/models/ClientQueryParams";

interface NavigationState {
  queryParams: ClientQueryParams;
}

const ScopesPage = () => {
  const location = useLocation();
  const [clientQueryParams, setClientQueryParams] = useState<ClientQueryParams | null>(null);
  const [clientName, setClientName] = useState<string>(clientMock);
  const [scopes, setScopes] = useState<Scope[]>(
    scopesMock.map((scope) => {
      return {
        name: scope,
        checked: false,
      } as Scope;
    })
  );

  const checkHandler = (scopeName: string) => {
    setScopes((prevState) =>
      prevState.map((scope) => (scope.name === scopeName ? { ...scope, checked: !scope.checked } : scope))
    );
  };

  useEffect(() => {
    const { queryParams } = location.state as NavigationState;
    setClientQueryParams(queryParams);
  }, [location.state]);

  useEffect(() => {
    if (clientQueryParams !== null) {
      setScopes((prevState) =>
        prevState.map((scope) => (clientQueryParams.scopes.includes(scope.name) ? { ...scope, checked: true } : scope))
      );
    }
  }, [clientQueryParams]);

  return (
    <ScopesPageStyled>
      <PageHeader>
        <span className="highlighted-text">{clientName}</span> is requesting your permission
      </PageHeader>
      <ListSpace>
        <p>Uncheck the permissions you do not wish to grant.</p>
        <ScopeList scopes={scopes} checkHandler={checkHandler} />
      </ListSpace>
      <ButtonSpace>
        <Button variant="contained">Approve</Button>
        <Button variant="contained" style={{ backgroundColor: "lightgray" }}>
          Do not approve
        </Button>
      </ButtonSpace>
    </ScopesPageStyled>
  );
};

export default ScopesPage;
