import * as React from "react";
import styled from "styled-components";
import { useKeyUpEsc } from "../../hooks/useKeyUpEsc";
import { TransitionStatus } from "react-transition-group/Transition";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: #7c6262;
  opacity: 0.1;
  position: absolute;
  z-index: 10;
  bottom: 0;
  right: 0;
`;

const Wrapper = styled.div`
  width: 400px;
  height: 100%;
  background: #ffffff;
  position: fixed;
  z-index: 20;
  box-shadow: 0px 0px 5px #0000001f;
  transition: right 0.3s ease-in-out;

  &.entering {
    right: -405px;
  }
  &.entered {
    right: 0;
  }
  &.exiting {
    right: -405px;
  }
  &.exited {
    right: -405px;
  }
`;

const ContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 400px;
  height: 100%;
`;

interface Props {
  handleClose: () => void;
  transitionStatus?: TransitionStatus;
}

export const LateralPanel: React.FC<Props> = ({ handleClose, children, transitionStatus }) => {
  useKeyUpEsc(handleClose);

  return (
    <>
      <Wrapper className={transitionStatus}>
        <ContentPanel>{children}</ContentPanel>
      </Wrapper>
      <Background onClick={handleClose} />
    </>
  );
};
