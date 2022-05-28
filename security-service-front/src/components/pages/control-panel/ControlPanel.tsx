import LoadingOverlay from "components/common/LoadingOverlay";
import { useEffect, useState } from "react";
import { Client } from "utilities/models/Clients";
import { getClients, getScopes } from "utilities/tools/api";
import ScopeList from "../scopes/scope-list/ScopeList";
import { ControlPanelStyled, GridSpace, HeaderText } from "./ControlPanel.Styled";

const ControlPanel = () => {
  const [scopes, setScopes] = useState<string[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    getClients().then((c: Client[]) => setClients(c));
    getScopes().then((s: string[]) => setScopes(s));
  }, []);

  useEffect(() => {
    if (clients.length > 0 && scopes.length > 0) {
      setLoading(false);
    }
  }, [clients, scopes]);

  return (
    <ControlPanelStyled>
      <HeaderText>Control Panel</HeaderText>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <GridSpace>
          {clients.map((client) => (
            <ScopeList key={client.id} scopesAll={scopes} client={client} setClients={setClients} />
          ))}
        </GridSpace>
      )}
    </ControlPanelStyled>
  );
};

export default ControlPanel;
