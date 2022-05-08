import { ButtonSpace, ListSpace, PageHeader, ScopesPageStyled } from "./ScopesPage.Styles";
import { clientMock, scopesMock } from "utilities/mocks";
import { useState } from "react";
import ScopeList from "./scope-list/ScopeList";
import Scope from "utilities/model/Scope";
import { Button } from "@mui/material";

const ScopesPage = () => {
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
      prevState.map((scope) => (scope.name === scopeName ? { name: scope.name, checked: !scope.checked } : scope))
    );
  };

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
