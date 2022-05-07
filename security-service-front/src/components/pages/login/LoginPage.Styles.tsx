import styled from "styled-components";

export const LoginPageStyled = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 100%;
  padding-top: 3rem;
`;

export const Logo = styled.img`
  width: 20%;
  max-width: 250px;
  margin-bottom: 5rem;
`;

export const InputSpace = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 2rem;

  min-width: 500px;
  max-width: 50%;

  div {
    width: 100%;
  }
`;
