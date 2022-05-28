import styled from "styled-components";

const BaseStyle = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`;

export const ListItemStyled = styled(BaseStyle)`
  flex-direction: column;
  justify-content: space-between;
`;

export const MainSpace = styled(BaseStyle)`
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5rem 2rem 0 2rem;

  font-weight: bold;
`;

export const WarningSpace = styled(BaseStyle)`
  flex-direction: row;
  justify-content: end;
  padding: 0 0.6rem 0.3rem 0;

  color: #d4a933;
  font-size: 0.7rem;

  svg {
    font-size: 1rem;
  }
`;
