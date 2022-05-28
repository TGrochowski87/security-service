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
  margin-bottom: 1rem;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
`;

export const InputSpace = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 2rem;
  margin: 4rem 0 1rem 0;

  min-width: 200px;
  width: 50%;
  max-width: 600px;

  .css-1nrlq1o-MuiFormControl-root {
    width: 100%;
  }

  button {
    margin-right: auto;
  }
`;
