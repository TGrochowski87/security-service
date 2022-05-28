import styled from "styled-components";

export const ControlPanelStyled = styled.div`
  position: relative;
  padding: 2rem 4rem;
  width: 100%;
`;

export const HeaderText = styled.h1`
  color: var(--blue);
  width: fit-content;
  margin: auto;
  margin-bottom: 3rem;
`;

export const GridSpace = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  column-gap: 2rem;
  row-gap: 2rem;
  padding: auto;
`;
