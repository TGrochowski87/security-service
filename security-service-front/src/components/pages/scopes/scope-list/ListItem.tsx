import { Checkbox } from "@mui/material";
import { ListItemStyled, MainSpace } from "./ListItem.Styles";

interface Props {
  scope: string;
  checked: boolean;
  handleCheck: Function;
  odd: boolean;
}

const ListItem = ({ scope, checked, handleCheck, odd }: Props) => {
  return (
    <ListItemStyled style={{ backgroundColor: odd ? "#e8e8e8" : "" }}>
      <MainSpace>
        <p>{scope}</p>
        <Checkbox
          checked={checked}
          onChange={() => {
            handleCheck(scope);
          }}
        />
      </MainSpace>
    </ListItemStyled>
  );
};

export default ListItem;
