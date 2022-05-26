import { Button, Divider } from "@mui/material";
import { useState } from "react";
import { Client } from "utilities/models/Clients";
import ListItem from "./ListItem";
import { Header, ScopeListStyled } from "./ScopeList.Styles";

interface Props {
  scopesAll: string[];
  client: Client;
  setClients: Function;
}

const ScopeList = ({ scopesAll, client, setClients }: Props) => {
  const [changesMade, setChangesMade] = useState<boolean>(false);

  const handleCheck = (scope: string) => {
    const newClientScopes = client.scopes.includes(scope)
      ? client.scopes.filter((s: string) => s !== scope)
      : [...client.scopes, scope];

    setClients((prevState: Client[]) =>
      prevState.map((c) => (c.id !== client.id ? c : { ...c, scopes: newClientScopes }))
    );
    setChangesMade(true);
  };

  return (
    <ScopeListStyled>
      <Header>
        <p>{client.name}</p>
        <Button variant="contained" disabled={!changesMade}>
          Save
        </Button>
      </Header>
      <>
        {scopesAll.map((scope, index) => (
          <span key={index}>
            <ListItem
              scope={scope}
              checked={client.scopes.includes(scope)}
              handleCheck={handleCheck}
              odd={index % 2 === 1}
            />
            {index !== scopesAll.length - 1 && <Divider color="lightgray" />}
          </span>
        ))}
      </>
    </ScopeListStyled>
  );
};

export default ScopeList;
