import { Divider } from "@mui/material";
import Scope from "utilities/models/Scope";
import ListItem from "./ListItem";
import { Header, ScopeListStyled } from "./ScopeList.Styles";

interface Props {
  scopes: Scope[];
  checkHandler: Function;
}

const ScopeList = ({ scopes, checkHandler }: Props) => {
  return (
    <ScopeListStyled>
      <Header>Grants</Header>
      <>
        {scopes.map((scope, index) => (
          <span key={index}>
            <ListItem scope={scope} checkHandler={checkHandler} odd={index % 2 === 1} />
            {index !== scopes.length - 1 && <Divider color="lightgray" />}
          </span>
        ))}
      </>
    </ScopeListStyled>
  );
};

export default ScopeList;
