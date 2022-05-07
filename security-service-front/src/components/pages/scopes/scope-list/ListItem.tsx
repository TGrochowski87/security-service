import { Checkbox } from "@mui/material";
import Scope from "utilities/model/Scope";
import { ListItemStyled } from "./ListItem.Styles";

interface Props {
  scope: Scope;
  checkHandler: Function;
  odd: boolean;
}

const ListItem = ({ scope, checkHandler, odd }: Props) => {
  return (
    <ListItemStyled style={{ backgroundColor: odd ? "#e8e8e8" : "" }}>
      <p>{scope.name}</p>
      <Checkbox checked={scope.checked} onChange={() => checkHandler(scope.name)} />
    </ListItemStyled>
  );
};

export default ListItem;
