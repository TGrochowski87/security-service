import { Button } from "@mui/material";
import { useState } from "react";
import { Client } from "utilities/models/Clients";
import ScopeList from "../scopes/scope-list/ScopeList";
import { ControlPanelStyled, GridSpace, HeaderText } from "./ControlPanel.Styled";

const ControlPanel = () => {
  const [scopes, setScopes] = useState<string[]>(["scope1", "scope2", "scope3", "scope4"]);
  const [clients, setClients] = useState<Client[]>([
    {
      id: "0",
      name: "test1",
      scopes: ["scope1", "scope3"],
    },
    {
      id: "1",
      name: "test2",
      scopes: ["scope2", "scope3"],
    },
    {
      id: "2",
      name: "test3",
      scopes: ["scope1", "scope2", "scope3"],
    },
    {
      id: "3",
      name: "test4",
      scopes: ["scope3"],
    },
    {
      id: "4",
      name: "test5",
      scopes: ["scope2"],
    },
    {
      id: "5",
      name: "test6",
      scopes: ["scope1"],
    },
    {
      id: "6",
      name: "test7",
      scopes: ["scope3"],
    },
  ]);

  return (
    <ControlPanelStyled>
      <HeaderText>Control Panel</HeaderText>
      <GridSpace>
        {clients.map((client) => (
          <ScopeList key={client.id} scopesAll={scopes} client={client} setClients={setClients} />
        ))}
      </GridSpace>
    </ControlPanelStyled>
  );
};

export default ControlPanel;
