import { Alert, Button, Divider, Snackbar } from "@mui/material";
import { useState } from "react";
import { Client } from "utilities/models/Clients";
import { updateClient } from "utilities/tools/api";
import ListItem from "./ListItem";
import { Header, ScopeListStyled } from "./ScopeList.Styles";

interface Props {
  scopesAll: string[];
  client: Client;
  setClients: Function;
}

interface UpdateFeedback {
  showFeedback: boolean;
  isSuccess: boolean;
}

const ScopeList = ({ scopesAll, client, setClients }: Props) => {
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [udpateFeedback, setUpdateFeedback] = useState<UpdateFeedback>({
    showFeedback: false,
    isSuccess: false,
  });

  const handleCheck = (scope: string) => {
    const newClientScopes = client.scopes.includes(scope)
      ? client.scopes.filter((s: string) => s !== scope)
      : [...client.scopes, scope];

    setClients((prevState: Client[]) =>
      prevState.map((c) => (c.id !== client.id ? c : { ...c, scopes: newClientScopes }))
    );
    setChangesMade(true);
  };

  const handleSave = () => {
    updateClient(client.id, client.scopes)
      .then((r) => {
        setUpdateFeedback({
          showFeedback: true,
          isSuccess: true,
        });

        setChangesMade(false);
      })
      .catch((e) => {
        setUpdateFeedback({
          showFeedback: true,
          isSuccess: false,
        });
      });
  };

  return (
    <ScopeListStyled>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={udpateFeedback.showFeedback}
        autoHideDuration={6000}
        onClose={() =>
          setUpdateFeedback((prevState: UpdateFeedback) => {
            return {
              ...prevState,
              showFeedback: false,
            };
          })
        }
      >
        <Alert severity="success">Client successfully updated.</Alert>
      </Snackbar>
      <Header>
        <p>{client.name}</p>
        <Button variant="contained" onClick={handleSave} disabled={!changesMade}>
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
