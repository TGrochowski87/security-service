import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const LoadingOverlay = () => {
  return (
    <LoadingOverlayStyled>
      <CircularProgress />
    </LoadingOverlayStyled>
  );
};

const LoadingOverlayStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #b0b0b076;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  width: 100vw;
  height: 100vh;
`;

export default LoadingOverlay;
