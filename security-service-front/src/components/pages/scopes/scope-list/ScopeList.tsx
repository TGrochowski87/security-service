import { Divider } from "@mui/material";
import Scope from "utilities/model/Scope";
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
          <>
            <ListItem key={index} scope={scope} checkHandler={checkHandler} odd={index % 2 === 1} />
            {index !== scopes.length - 1 && <Divider color="lightgray" />}
          </>
        ))}
      </>
    </ScopeListStyled>
  );
};

export default ScopeList;
