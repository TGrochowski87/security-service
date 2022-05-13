import { Checkbox } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

import Scope from "utilities/models/Scope";
import { ListItemStyled, MainSpace, WarningSpace } from "./ListItem.Styles";

interface Props {
  scope: Scope;
  checkHandler: Function;
  odd: boolean;
}

const ListItem = ({ scope, checkHandler, odd }: Props) => {
  return (
    <ListItemStyled style={{ backgroundColor: odd ? "#e8e8e8" : "" }}>
      <MainSpace>
        <p>{scope.name}</p>
        <Checkbox checked={scope.checked} onChange={() => checkHandler(scope.name)} />
      </MainSpace>
      <WarningSpace style={{ visibility: scope.checked && scope.requested === false ? "visible" : "hidden" }}>
        <p>This permission was not requested!</p>
        <WarningIcon />
      </WarningSpace>
    </ListItemStyled>
  );
};

export default ListItem;
